import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export const habitRouter = router({
    getHabitById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const { data: habits, error } = await supabase.from('Habit').select('*').eq('id', input.id)
            if (error) {
                console.log(error.message)
                return error
            }
            return habits![ 0 ]
        }),
})
