import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'
import { trpc } from '../../utils/trpc'

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
)


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'POST') {
        try {
            const { authorization } = req.headers

            if (authorization === `Bearer ${process.env.ATOMIC_API_SECRET}`) {
                const allUsers: any = trpc.user.getAllUserEmails.useQuery()
                const userEmails: string[] = []
                const UTCDate = new Date()
                const UTCTimestamp = [ UTCDate.getUTCHours(), UTCDate.getUTCMinutes(), UTCDate.getUTCFullYear() ]
                const LocalDate = new Date()
                const LocalDateTimeStamp = [ LocalDate.getHours(), LocalDate.getMinutes(), LocalDate.getFullYear() ]

                allUsers.forEach((user: any) => {
                    if (LocalDateTimeStamp[ 0 ]! - UTCTimestamp[ 0 ]! === user.UTCOffset) {
                        userEmails.push(user.email)
                    }
                })

                userEmails.forEach(async (email: any) => {
                    const habits: any = trpc.habit.getHabitsByEmail.useQuery(email)
                    habits.forEach(async (habit: any) => {
                        const mutation = trpc.history.createHistoryAndUpdateStock.useMutation()
                        mutation.mutate({ hid: habit.id, status: habit.status })
                    })
                })

                res.status(200).json({ success: true })
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