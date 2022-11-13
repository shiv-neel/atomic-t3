import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from "@supabase/supabase-js"
import { HabitHistory } from '@prisma/client'
import { trpc } from '../../../utils/trpc'
import { dataRouter } from './data'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export const historyRouter = router({
  /* QUERIES */

  /*
  * generateDataObjectFromHid(hid)
  * returns a nivo-shaped data object containing a habit's history sorted by date 
  */
  generateDataObjectFromHid: publicProcedure
    .input(z.object({ hid: z.string() }))
    .query(async ({ input }) => {
      const { data: history, error } = await supabase
        .from("HabitHistory")
        .select("date, stock")
        .eq("habitId", input.hid)
      if (error) {
        console.log(error.message)
        return error
      }
      if (!history) return []
      const compareDates = (a: HabitHistory, b: HabitHistory) => {
        if (a.date < b.date) return -1
        else if (a.date > b.date) return 1
        return 0
      }
      const nivoData = [ {
        id: input.hid,
        data: history.sort((a, b) => compareDates(a, b))
      } ]

      return nivoData 
    }),
  /* MUTATIONS */
  createFirstHistory: publicProcedure
    .input(z.object({ hid: z.string(), stock: z.number().nullish(), status: z.string().nullish() }))
    .mutation(async ({ input }) => {
      /* creating and inserting today's history node */
      const { data: _, error: historyInsertError } = await supabase.from('HabitHistory').insert({
        habitId: input.hid,
        status: input.status || 'o',
        stock: input.stock || 10
      })
    }),
  createNewHistoryAndUpdateHabit: publicProcedure.input(z.object({ hid: z.string(), status: z.string() })).mutation(async ({ input }) => {
    const caller = dataRouter.createCaller({})
    const lastStock: number = await caller.getCurrentStockValue({ hid: input.hid })
    var newStock = lastStock
    input.status === '+' ? newStock = lastStock * 1.01 : newStock = lastStock * 0.99
    if (input.status === '+') {
      newStock = lastStock * 1.01
    }
    else if (input.status === '-' || input.status === '?') {
      newStock = lastStock * 0.99
    }

    const newHistory = {
      hid: input.hid,
      stock: newStock,
      status: input.status
    }

    await supabase.from('HabitHistory').insert(newHistory)
    await supabase.from('Habit').update({ stock: newStock, status: '?' }).match({ id: input.hid })
  })
})
