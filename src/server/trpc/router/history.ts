import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from "@supabase/supabase-js"
import { HabitHistory } from '@prisma/client'
import { trpc } from '../../../utils/trpc'
import { dataRouter } from './data'
import { STATUS_SUCCESS, STATUS_FAILURE, STATUS_NEUTRAL, STATUS_NULL } from '../../../utils/status'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export const historyRouter = router({
  /* QUERIES */

  /*
  * generateDataObjectFromHid(hid)
  * returns an array of habit's history sorted by date 
  */
  generateSortedHistoryFromHid: publicProcedure
    .input(z.object({ hid: z.string() }))
    .query(async ({ input }) => {
      const { data: history, error } = await supabase
        .from("HabitHistory")
        .select("date, stock")
        .eq("habitId", input.hid).order('date', { ascending: false })
      if (error) {
        console.log(error.message)
        return []
      }
      return history
    }),
  /* MUTATIONS */
  createFirstHistory: publicProcedure
    .input(z.object({ hid: z.string(), stock: z.number().nullish(), status: z.string().nullish() }))
    .mutation(async ({ input }) => {
      /* creating and inserting today's history node */
      const { data: _, error: historyInsertError } = await supabase.from('HabitHistory').insert({
        habitId: input.hid,
        status: input.status || STATUS_NEUTRAL,
        stock: input.stock || 10
      })
    }),
  createNewHistory: publicProcedure.input(z.object({ hid: z.string(), stock: z.number().nullish(), status: z.string().nullish() })).mutation(async ({ input }) => {
    const newHistory = {
      habitId: input.hid,
      stock: input.stock,
      status: input.status
    }
    const { data: _, error } = await supabase.from('HabitHistory').insert(newHistory)
    if (error) console.log(error)
  }),
  createHistoryAndUpdateStock: publicProcedure.input(z.object({ hid: z.string(), status: z.string() })).mutation(async ({ input }) => {
    const historyCaller = historyRouter.createCaller({})
    const dataCaller = dataRouter.createCaller({})

    const lastStock = await dataCaller.getCurrentStockValue({ hid: input.hid })
    let newStock = lastStock.stock
    if (input.status === STATUS_SUCCESS) {
      newStock *= 1.01
    }
    else if (input.status === STATUS_FAILURE || input.status === STATUS_NULL) {
      newStock *= 0.99
    }

    await historyCaller.createNewHistory({ hid: input.hid, stock: newStock, status: input.status })
    await supabase.from('Habit').update({ stock: newStock, status: input.status }).match({ id: input.hid })
  }),
  resetStatusDaily: publicProcedure.input(z.object({ hid: z.string() })).mutation(async ({ input }) => {
    await supabase.from('Habit').update({ status: STATUS_NULL }).match({ id: input.hid })
  })
})
