// src/server/router/_app.ts
import { router } from "../trpc"
import { habitRouter } from './habit'
import { userRouter } from './user'

export const appRouter = router({
  user: userRouter,
  habit: habitRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
