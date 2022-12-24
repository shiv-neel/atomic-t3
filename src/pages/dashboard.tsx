import { Box, Button } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import RightHandHabitsPanel from '../components/dashboard/rhp/RightHandHabitsPanel'
import TimeSeriesGlobal from '../components/dashboard/TimeSeriesGlobal'
import { STATUS_FAILURE } from '../utils/status'
import { TEMPORALITY_MORNING } from '../utils/temporality'
import { trpc } from '../utils/trpc'

const Dashboard: NextPage = () => {
	const { data: session } = useSession()
	const router = useRouter()
	useEffect(() => {
		if (!session) {
			router.push('/')
		}
	})

	const newHabitAndFirstHistory = trpc.habit.createHabit.useMutation()
	const handler = () => {
		console.log('handler')
	}

	const newHistoryAndUpdateHabit =
		trpc.history.createHistoryAndUpdateStock.useMutation()

	const handler2 = () => {
		newHistoryAndUpdateHabit.mutate({
			hid: 'a8c649ad-7465-4133-aafa-0acf002d9665',
			status: STATUS_FAILURE,
		})
	}

	return (
		<Box className='mx-auto flex justify-center md:justify-evenly'>
			<Box className='w-1/2'>
				<TimeSeriesGlobal hid='a8c649ad-7465-4133-aafa-0acf002d9665' />
			</Box>
			<Box className='border-t-black'>
				<RightHandHabitsPanel />
			</Box>
		</Box>
	)
}

export default Dashboard
