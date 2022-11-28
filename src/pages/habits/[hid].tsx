import { Box, Divider } from '@chakra-ui/react'
import { Habit } from '@prisma/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CompleteHabitCard from '../../components/habit_page_view/CompleteHabitCard'
import HabitInfo from '../../components/habit_page_view/HabitInfo'
import { trpc } from '../../utils/trpc'
import { HabitProps } from '../../utils/types'

import { habitRouter } from '../../../src/server/trpc/router/habit'
import TimeSeriesSingle from '../../components/habitpage/TimeSeriesSingle'

const HabitPage: React.FC<HabitProps> = ({ habit }) => {
	console.log(habit)
	const [submitted, setSubmitted] = useState<boolean>(false)
	const [status, setStatus] = useState<'+' | '-' | 'o' | '?'>('?')

	useEffect(() => {
		if (!habit) return
		if (habit.status === '+' || habit.status === '-' || habit.status === 'o') {
			setStatus(habit.status)
			setSubmitted(true)
		} else {
			setStatus('?')
			setSubmitted(false)
		}
	}, [habit])

	return (
		<Box className='flex w-full flex-col'>
			<Box className='mt-6 flex justify-center gap-10'>
				<Box className='relative' w='2xl'>
					{/* <TimeSeriesSingle hid={habit.id} /> */}
				</Box>
				<Box>
					<CompleteHabitCard
						habit={habit && habit}
						submitted={submitted}
						status={status}
						setSubmitted={setSubmitted}
						setStatus={setStatus}
					/>
				</Box>
			</Box>
			<Divider mt={3} />
			<Box className='mx-36 mt-3 flex justify-start'>
				{/* <HabitInfo habit={habit} submitted={submitted} /> */}
			</Box>
		</Box>
	)
}

export default HabitPage

export async function getServerSideProps(context: any) {
	const hid = context.query.hid
	// TODO: move this to a next api handler
	const habitCaller = habitRouter.createCaller({})
	const habit = await habitCaller.getHabitByHid({ hid })
	console.log(habit)
	return {
		props: { habit },
	}
}
