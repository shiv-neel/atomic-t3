export interface Habit {
	hid?: string
	uid?: string
	hname: string
	description?: string
	created_at?: Date
	cue?: string
	craving?: string
	response?: string
	reward?: string
	type?: 'morning' | 'night' | 'daily'
	status?: '+' | '-' | 'o' | ''
	stashed?: boolean
}

export interface HabitHistory {
	hid: string
	history_id?: string
	date?: Date
	status: '+' | '-' | 'o' | ''
	stonk?: number
}

export const DEFAULT_STONK = 10.0

export interface MorningRoutineHabit extends Habit {}

export interface NighttimeRoutineHabit extends Habit {}

export interface DailyHabit extends Habit {}
