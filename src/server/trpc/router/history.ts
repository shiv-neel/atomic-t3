import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from "@supabase/supabase-js"

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
        .select("*")
        .eq("habitId", input.hid)
      if (error) {
        console.log(error.message)
        return error
      }
      return history
    }),
  /* MUTATIONS */
  createHistoryHead: publicProcedure.input(z.object({ hid: z.string() })).mutation(async ({ input }) => {
    const { data: _, error: historyInsertError } = await supabase.from('HabitHistory').insert({
      habitId: input.hid,
      status: '_',
      stock: 10,
    })
    if (historyInsertError)
      return historyInsertError
  }),

  /* Route to get called at on each habit for each user, if time is midnight for user's current timezone. */
  createHistoryNodeAndUpdateHabit: publicProcedure
    .input(z.object({ hid: z.string(), status: z.string(), stock: z.number() }))
    .mutation(async ({ input }) => {
      /* creating and inserting today's history node */
      const { data: _, error: historyInsertError } = await supabase.from('HabitHistory').insert({
        habitId: input.hid,
        status: input.status,
        stock: input.stock,
        date: new Date()
      })
      if (historyInsertError)
        return historyInsertError
      /* updating habit instance */
      const { data: __, error: habitUpdateError } = await supabase.from('Habit').update({
        status: input.status,
        stock: input.stock
      })
      if (habitUpdateError)
        return habitUpdateError

    }),

});
