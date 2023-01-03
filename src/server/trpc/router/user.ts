import { router, publicProcedure } from "../trpc"
import { z } from "zod"
import { createClient } from '@supabase/supabase-js'
import * as CryptoJS from 'crypto-js'
import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { trpc } from '../../../utils/trpc'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export const userRouter = router({
  /* QUERIES */
  getUserByEmail: publicProcedure
        .input(z.object({ email: z.string() }))
        .query(async ({ input }) => {
            const { data: users, error } = await supabase.from('User').select('*').eq('email', input.email)
            if (error) {
                console.log(error.message)
                return null
            }
            return users![ 0 ]
        }),
  getAllUsers: publicProcedure.query(async ({ }) => {
    const { data: users, error } = await supabase.from('User').select('*')
    if (error) {
      console.log(error.message)
      return []
    }
    return users
  }),
      /* MUTATIONS */
    signUpUser: publicProcedure
        .input(z.object({ email: z.string(), name: z.string() }))
        .mutation(async ({ input }) => {
          const { data: user, error } = await supabase.from("User").insert({
            email: input.email,
            name: input.name,
            createdAt: new Date(),
          });
          // if (user) {
          //   console.log(user);
          // }
          if (error) {
            // console.log(error.message);
            return null;
          }
          return user![0];
        }),
    updateLastLogin: publicProcedure
        .input(z.object({ email: z.string() })).mutation(async ({ input }) => {
          const { data: user, error } = await supabase
            .from("User")
            .update({ updatedAt: new Date() })
            .eq("email", input.email);
          // if (user) {
          //   console.log(user);
          // }
          if (error) {
            // console.log(error.message);
            return null;
          }
          return user[0];
        }),
  hashPassword: publicProcedure.input(z.object({ plainTextPassword: z.string() })).query(async ({ input }) => {
    const ciphertext = CryptoJS.AES.encrypt(input.plainTextPassword, process.env.ATOMIC_API_SECRET!)
    return ciphertext.toString()

  }),
  comparePasswords: publicProcedure.input(z.object({ password: z.string(), hashedPassword: z.string() })).query(async ({ input }) => {
    const bytes = CryptoJS.AES.decrypt(input.hashedPassword, process.env.ATOMIC_API_SECRET!)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return input.password === decrypted
  }),

  attemptLogin: publicProcedure.input(z.object({ email: z.string(), password: z.string() })).query(async ({ input }) => {
    const userCaller = userRouter.createCaller({})
    const user: User = trpc.user.getUserByEmail.useQuery({ email: input.email }).data
    if (!user) throw new TRPCError({
      code: 'NOT_FOUND',
      message: `User with email ${input.email} not found`,
    })
    const passwordsMatch = await userCaller.comparePasswords({ password: input.password, hashedPassword: user.password })
    if (passwordsMatch) {
      await userCaller.updateLastLogin({ email: user.email })
      return { success: true, user }
    }
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `Incorrect password`,
    })
  })
})
