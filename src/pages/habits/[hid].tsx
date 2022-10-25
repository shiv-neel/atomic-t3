import { Box, Divider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CompleteHabitCard from '../../components/habit_page_view/CompleteHabitCard'
import HabitInfo from '../../components/habit_page_view/HabitInfo'
import TimeSeriesView from '../../components/stonk_view/TimeSeriesView'
import { Habit } from '../../models/Habit'

const HabitPage = () => {
	const router = useRouter()
	const { hid } = router.query

	const [habit, setHabit] = useState<Habit>()
	const [submitted, setSubmitted] = useState<boolean>(false)
	const [status, setStatus] = useState<'+' | '-' | 'o' | ''>('')

	useEffect(() => {
		if (!habit) return
		if (habit.status === '+' || habit.status === '-' || habit.status === 'o') {
			setStatus(habit.status)
			setSubmitted(true)
		} else {
			setStatus('')
			setSubmitted(false)
		}
	}, [habit])

	return (
		<Box className='flex flex-col w-full'>
			<Box className='flex justify-center gap-10 mt-6'>
				<Box className='relative' w='2xl'>
					<TimeSeriesView hid={hid?.toString()} submitted={submitted} />
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
			<Box className='flex justify-start mx-36 mt-3'>
				<HabitInfo habit={habit} submitted={submitted} />
			</Box>
		</Box>
	)
}

export default HabitPage
