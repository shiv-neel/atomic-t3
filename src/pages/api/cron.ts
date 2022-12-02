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
                const localUserEmails: string[] = []

                const UTCDate = new Date()

                for (const user of allUsers) {
                    const UTCOffset = user.UTCOffset
                    if (UTCDate.getHours() === -UTCOffset && UTCDate.getMinutes() === 0) {
                        localUserEmails.push(user.email)
                    }
                }

                const habits: any[] = []
                for (const email of localUserEmails) {
                    const userHabits = await habitCaller.getHabitsByEmail({ email })
                    habits.push(...userHabits)
                }

                for (const habit of habits) {
                    console.log(habit)
                    await historyCaller.createHistoryAndUpdateStock({ hid: habit.id, status: habit.status })
                    await historyCaller.resetStatusDaily({ hid: habit.id })
                }

                res.status(200).json({ success: habits })
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