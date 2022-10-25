import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export const habitRouter = router({
    getHabitByHid: publicProcedure
        .input(z.object({ hid: z.string() }))
        .query(async ({ input }) => {
            const { data: habits, error } = await supabase.from('Habit').select('*').eq('hid', input.hid)
            if (error) {
                console.log(error.message)
                return error
            }
            return habits![ 0 ]
        }),
    getHabitsByUid: publicProcedure.input(z.object({ uid: z.string() })).query(async ({ input }) => {
        const { data: habits, error } = await supabase.from('Habit').select('*').eq('uid', input.uid)
        if (error) {
            console.log(error.message)
            return error
        }
        console.log(habits)
        return habits
    })
})
