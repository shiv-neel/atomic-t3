import { Habit, HabitHistory } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { trpc } from '../../../utils/trpc'
import { publicProcedure, router } from '../trpc'
import { historyRouter } from './history'

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
)

export const dataRouter = router({
    /* QUERIES */
    /*
    getCurrentStock: returns the current stock of a single habit
    */
    getCurrentStockValue: publicProcedure.input(z.object({ hid: z.string() })).query(async ({ input }) => {
        const { data: currentStock, error } = await supabase.from('Habit').select('stock').eq('id', input.hid)
        if (error || !currentStock)
            return { stock: 10 }
        return currentStock[ 0 ]
    }),
    getAllStockValues: publicProcedure.input(z.object({ email: z.string() })).query(async ({ input }) => {
        const habits: any = trpc.habit.getHabitsByEmail.useQuery({ email: input.email })
        if (!habits) return 10
        const sum = habits.reduce((s: number, habit: Habit) => s + habit.stock, 0)
        return sum
    }),
    getDeltaOverRange: publicProcedure.input(z.object({ hid: z.string(), range: z.number() })).query(async ({ input }) => {
        const { data: history, error } = await supabase.from('HabitHistory').select('stock').eq('habitId', input.hid).order('date', { ascending: false })
        let start = 0
        let end = 0
        if (error || !history || history.length < input.range) {

            if (error || !history || history.length < 2) {
                if (error) console.log(error)
                return { valueChange: 0, percentChange: 0 }
            }
            start = history[ history.length - 1 ].stock
            end = history[ 0 ].stock
        }
        else {
            start = history[ input.range ].stock
            end = history[ 0 ].stock
        }
        const valueChange = end - start
        const percentChange = ((valueChange) / start) * 100
        return { valueChange, percentChange }
    }),
    getDataObjectOverRange: publicProcedure.input(z.object({ hid: z.string(), range: z.number() })).query(async ({ input }) => {
        const historyCaller = historyRouter.createCaller({})
        const history = await historyCaller.generateSortedHistoryFromHid({ hid: input.hid })
        const range = input.range > history.length ? history.length : input.range
        const data = history.slice(0, range)

        let sanitizedHistory: { x: string | Date, y: number }[] = []
        data.forEach((h: HabitHistory) => {
            const newObj = { x: h.date, y: h.stock * -1 }
            sanitizedHistory.push(newObj)
        })

        return [ {
            id: input.hid,
            data: sanitizedHistory
        } ]
    }),
})