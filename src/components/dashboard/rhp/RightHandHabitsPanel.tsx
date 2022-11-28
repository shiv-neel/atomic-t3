import {
	Box,
	Button,
	Heading,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsCloudSun, BsPlusLg } from 'react-icons/bs'
import { IoCloudyNightOutline } from 'react-icons/io5'
import { trpc } from '../../../utils/trpc'
import HabitSummaryCard from './HabitSummaryCard'
import LoadingComponent from './LoadingComponent'
import Title from './Title'

const RightHandHabitsPanel = () => {
	const { data: session } = useSession()

	const habits = trpc.habit.getHabitsByEmail.useQuery({
		email: session?.user!.email!,
	}).data

	const { colorMode } = useColorMode()
	const bgc = colorMode === 'light' ? 'bg-gray-50' : 'bg-gray-900'

	return (
		<Box
			className={`flex w-72 flex-col items-center justify-between rounded-md p-4 shadow-md ${bgc} bg-sl invisible w-0 md:visible md:w-full`}
		>
			<Box className='w-full justify-center pt-2 text-xl font-bold'>Habits</Box>
			<Title text='Morning Habit Stack' icon={<BsCloudSun />} />
			<Box>
				{habits ? (
					habits
						.filter((habit) => habit.type === 'morning')
						.map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
				) : (
					<LoadingComponent />
				)}
			</Box>
			<Button className='w-full shadow-md' variant='outline'>
				<BsPlusLg />
			</Button>
			<Title text='Daily Habit Stack' icon={<AiOutlineCalendar />} />
			<Box>
				{habits ? (
					habits
						.filter((habit) => habit.type === 'daily')
						.map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
				) : (
					<LoadingComponent />
				)}
			</Box>
			<Button className='w-full shadow-md' variant='outline'>
				<BsPlusLg />
			</Button>
			<Title text='Nighttime Habit Stack' icon={<IoCloudyNightOutline />} />
			<Box>
				{habits ? (
					habits
						.filter((habit) => habit.type === 'night')
						.map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
				) : (
					<LoadingComponent />
				)}
			</Box>
			<Button className='w-full shadow-md' variant='outline'>
				<BsPlusLg />
			</Button>
		</Box>
	)
}

export default RightHandHabitsPanel
