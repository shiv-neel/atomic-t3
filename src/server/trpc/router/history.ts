import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const historyRouter = router({
  /* QUERIES */
  getHistoryByHid: publicProcedure
    .input(z.object({ hid: z.string() }))
    .query(async ({ input }) => {
      const { data: history, error } = await supabase
        .from("HabitHistory")
        .select("*")
        .eq("habitId", input.hid);
      if (error) {
        console.log(error.message);
        return error;
      }
      return history;
    }),
  /* MUTATIONS */
  createFirstHistory: publicProcedure
    .input(z.object({ hid: z.string(), status: z.string(), stock: z.number() }))
    .mutation(async ({ input }) => {
      const { data, error } = await supabase.from("HabitHistory").insert({
        habitId: input.hid,
        status: input.status,
        stock: input.stock,
      });
    }),
});
