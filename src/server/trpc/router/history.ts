import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from "@supabase/supabase-js"
import { HabitHistory } from '@prisma/client'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export const historyRouter = router({
  /* QUERIES */
  getHistoryByHid: publicProcedure
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
      const compareDates = (a: HabitHistory, b: HabitHistory) => {
        if (a.date < b.date) return -1
        else if (a.date > b.date) return 1
        return 0
      }
      return history.sort((a, b) => compareDates(a, b))
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
})
