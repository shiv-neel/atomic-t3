import { Box, Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Chart from '../components/Chart'
import RightHandHabitsPanel from '../components/dashboard/rhp/RightHandHabitsPanel'
import TimeSeriesMain from '../components/habitpage/TimeSeriesMain'
import { trpc } from '../utils/trpc'

const Dashboard = () => {
	const { data: session } = useSession()
	const router = useRouter()
	useEffect(() => {
		if (!session) {
			router.push('/')
		}
	})

	const newHabitAndFirstHistory = trpc.habit.createHabit.useMutation()
	const handler = () => {
		newHabitAndFirstHistory.mutate({
			userEmail: 'shiv.neel@gmail.com',
			name: 'diff habit 2',
			cue: 'Time is 8pm',
			craving: 'f',
			response: 'b',
			reward: 'q',
			duration: 10,
			location: 'home',
			type: 'morning',
			stashed: false,
		})
	}

	const newHistoryAndUpdateHabit =
		trpc.history.createHistoryAndUpdateStock.useMutation()

	const handler2 = () => {
		newHistoryAndUpdateHabit.mutate({
			hid: 'a8c649ad-7465-4133-aafa-0acf002d9665',
			status: '-',
		})
	}

	return (
		<Box>
			<RightHandHabitsPanel />
			<TimeSeriesMain hid='a8c649ad-7465-4133-aafa-0acf002d9665' range='5d' />
		</Box>
	)
}

export default Dashboard
