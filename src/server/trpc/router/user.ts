import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export const userRouter = router({
    pushNewUser: publicProcedure
        .input(z.object({ email: z.string(), fname: z.string(), lname: z.string() }))
        .query(async ({ input }) => {
            // TODO: check if user already exists
            // TODO: email validation
            const { data: user, error } = await supabase.from('User').insert([ { email: input.email, fname: input.fname, lname: input.lname, createdAt: new Date() } ])
            if (error) {
                return error
            }
        }),
    signInUser: publicProcedure
        .input(z.object({ id: z.string() })).query(async ({ input }) => {
            const { data: user, error } = await supabase.from('User').update({ updatedAt: Date.now() }).eq('id', input.id)
            if (error) {
                return error
            }
        }),
    getUserById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const { data: users, error } = await supabase.from('User').select('*').eq('id', input.id)
            if (error) {
                console.log(error.message)
                return error
            }
            return users![ 0 ]
        }),
})
