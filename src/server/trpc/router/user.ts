import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export const userRouter = router({
    getUserById: publicProcedure
        .input(z.object({ email: z.string() }))
        .query(async ({ input }) => {
            const { data: users, error } = await supabase.from('User').select('*').eq('email', input.email)
            if (error) {
                console.log(error.message)
                return null
            }
            return users![ 0 ]
        }),
    signUpUser: publicProcedure
        .input(z.object({ email: z.string(), name: z.string() }))
        .mutation(async ({ input }) => {
            const { data: user, error } = await supabase.from('User').insert([ { email: input.email, name: input.name, createdAt: new Date() } ])
            if (error) {
                return error
            }
            return user[ 0 ]
        }),
    updateLastLogin: publicProcedure
        .input(z.object({ email: z.string() })).mutation(async ({ input }) => {
            const { data: user, error } = await supabase.from('User').update({ updatedAt: new Date() }).eq('email', input.email)
            console.log(user)
            if (error) {
                return error
            }
            return user[ 0 ]
        }),
})
