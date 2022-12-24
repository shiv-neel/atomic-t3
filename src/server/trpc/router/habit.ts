import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from '@supabase/supabase-js'
import { Habit } from "@prisma/client";
import { historyRouter } from './history'
import { STATUS_NEUTRAL } from '../../../utils/status'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export const habitRouter = router({
  /* QUERIES */
  getHabitByHid: publicProcedure
    .input(z.object({ hid: z.string() }))
    .query(async ({ input }) => {
      const { data: habits, error } = await supabase
        .from("Habit")
        .select("*")
        .eq("id", input.hid);
      if (error) {
        console.log(error.message);
        return null;
      }
      return habits![0];
    }),
  getHabitsByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      const { data: habits, error } = await supabase
        .from("Habit")
        .select("*")
        .eq("userEmail", input.email);
      if (error) {
        console.log(error);
        return [];
      }
      return habits;
    }),
  /* MUTATIONS */
  createHabit: publicProcedure
    .input(
      z.object({
        userEmail: z.string(),
        name: z.string(),
        cue: z.string(),
        craving: z.string(),
        response: z.string(),
        reward: z.string(),
        type: z.string(),
        stashed: z.boolean().nullish(),
        duration: z.number(),
        location: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { data: duplicateHabit, error: duplicateHabitError } = await supabase.from('Habit').select('*').match({ 'userEmail': input.userEmail, 'name': input.name })
      if (duplicateHabit && duplicateHabit.length) {
        const error = { status: 400, message: 'Duplicated Habit' }
        return error
      }
      const { data: habit, error } = await supabase
        .from('Habit')
        .insert(input)
      if (error) {
        return error
      }
      const historyCaller = historyRouter.createCaller({})
      const result = await historyCaller.createFirstHistory({ status: STATUS_NEUTRAL, hid: habit[ 0 ].id })
    }),
  updateHabitMetadata: publicProcedure
    .input(
      z.object({
        hid: z.string(),
        name: z.string().nullish(),
        cue: z.string().nullish(),
        craving: z.string().nullish(),
        response: z.string().nullish(),
        reward: z.string().nullish(),
        type: z.string().nullish(),
        stashed: z.boolean().nullish(),
        duration: z.number().nullish(),
        location: z.string().nullish(),
      })
    )
    .mutation(async ({ input }) => {
      const newProps = Object.fromEntries(
        Object.entries(input).filter(([k, v]) => v !== null && k !== "id")
      );
      const { data, error } = await supabase
        .from("Habit")
        .update(newProps)
        .eq("id", input.hid);
      if (error) {
        return error;
      }
      return null;
    }),
});
