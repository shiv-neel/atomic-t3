import { Habit } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { trpc } from '../../../utils/trpc'
import { publicProcedure, router } from '../trpc'

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
        if (error)
            return 10
        return currentStock
    }),
    getAllStockValues: publicProcedure.input(z.object({ email: z.string() })).query(async ({ input }) => {
        const habits: any = trpc.habit.getHabitsByEmail.useQuery({ email: input.email })
        if (!habits) return 10
        const sum = habits.reduce((s: number, habit: Habit) => s + habit.stock, 0)
    })
})