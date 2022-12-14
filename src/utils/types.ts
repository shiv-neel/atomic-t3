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

export interface HabitDatumProps {
    id: string
    data: {
        x: string | Date
        y: number
    }[]
}