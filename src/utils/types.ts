import { Habit } from '@prisma/client'

export interface Delta {
    valueChange: number
    percentChange: number
}

export interface HidProps {
    hid: string
}

export interface HabitProps {
    habit: Habit
}

export type Range = '5d' | '10d' | '1m' | '3m' | '1y' | 'all'
