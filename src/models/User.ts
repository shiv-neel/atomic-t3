import { SupabaseClient } from '@supabase/supabase-js'

// client-side user instance
export interface UserType {
	uid?: string
	email: string
	password?: string
	fname?: string
	lname?: string
	createdAt?: Date
	loggedIn?: boolean
}
