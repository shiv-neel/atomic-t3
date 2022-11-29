import { Habit } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { habitRouter } from '../../server/trpc/router/habit'
import { HidProps } from '../../utils/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log(req.query)
    const { hid } = req.query
    if (typeof hid !== 'string') {
        return res.status(400).json({ error: 'Bad request' })
    }
    const habitCaller = habitRouter.createCaller({})
    try {
        const habit: Habit = await habitCaller.getHabitByHid({ hid })
        return res.status(200).json(habit)
    }
    catch (err) {
        return res.status(500).json(null)
    }
}