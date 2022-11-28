import { Habit, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { habitRouter } from '../../server/trpc/router/habit'
import { historyRouter } from '../../server/trpc/router/history'
import { userRouter } from '../../server/trpc/router/user'
import { trpc } from '../../utils/trpc'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers
            const userCaller = userRouter.createCaller({})
            const habitCaller = habitRouter.createCaller({})
            const historyCaller = historyRouter.createCaller({})

            if (authorization === `Bearer ${process.env.ATOMIC_API_SECRET}`) {
                const allUsers: User[] = await userCaller.getAllUsers()
                if (!allUsers) return res.status(400).json({ error: 'No users found' })
                const userEmails: string[] = allUsers.map((user: any) => user.email)
                // const userEmails: string[] = []
                // const UTCDate = new Date()
                // const UTCTimestamp = [ UTCDate.getUTCHours(), UTCDate.getUTCMinutes(), UTCDate.getUTCFullYear() ]
                // const LocalDate = new Date()
                // const LocalDateTimeStamp = [ LocalDate.getHours(), LocalDate.getMinutes(), LocalDate.getFullYear() ]

                // allUsers.forEach((user: any) => {
                //     if (LocalDateTimeStamp[ 0 ]! - UTCTimestamp[ 0 ]! === user.UTCOffset) {
                //         userEmails.push(user.email)
                //     }
                // })
                const habits: any[] = []
                userEmails.forEach(async (email: string) => {
                    const userHabits = await habitCaller.getHabitsByEmail({ email })
                    habits.push(...userHabits)
                })
                // TODO: figure out why habits array gets cleared after forEach loop
                res.status(200).json({ userEmails })
                habits.forEach(async (habit: any) => {
                    await historyCaller.createHistoryAndUpdateStock({ hid: habit.id, status: habit.status })
                })
            } else {
                res.status(401).json({ success: false })
            }
        } catch (err) {
            res.status(500).json({ statusCode: 500, message: 'Internal Error' })
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}