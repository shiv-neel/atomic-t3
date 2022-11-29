import {
	Box,
	Button,
	Heading,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react'
import { Habit } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsCloudSun, BsPlusLg } from 'react-icons/bs'
import { IoCloudyNightOutline } from 'react-icons/io5'
import {
	TEMPORALITY_DAILY,
	TEMPORALITY_MORNING,
	TEMPORALITY_NIGHT,
} from '../../../utils/temporality'
import { trpc } from '../../../utils/trpc'
import HabitSummaryCard from './HabitSummaryCard'
import LoadingComponent from './LoadingComponent'
import NewHabitActionWrapper from './NewHabitActionWrapper'
import Title from './Title'

const RightHandHabitsPanel = () => {
	const { data: session } = useSession()

	const habits: Habit[] = trpc.habit.getHabitsByEmail.useQuery({
		email: session?.user!.email!,
	}).data!

	const { colorMode } = useColorMode()
	const bgc = colorMode === 'light' ? 'bg-gray-50' : 'bg-gray-900'

	return (
		<Box
			className={`flex w-72 flex-col items-center justify-between rounded-md p-4 shadow-md ${bgc} bg-sl invisible w-0 md:visible md:w-full`}
		>
			<Box className='w-full justify-center pt-2 text-xl font-bold'>Habits</Box>
			<Title temporality={TEMPORALITY_MORNING} icon={<BsCloudSun />} />
			<Box>
				{habits ? (
					habits
						.filter((habit) => habit.temporality === TEMPORALITY_MORNING)
						.map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
				) : (
					<LoadingComponent />
				)}
			</Box>
			<NewHabitActionWrapper temporality={TEMPORALITY_MORNING}>
				<Button className='w-full shadow-md' variant='outline'>
					<BsPlusLg />
				</Button>
			</NewHabitActionWrapper>
			<Title temporality={TEMPORALITY_DAILY} icon={<AiOutlineCalendar />} />
			<Box>
				{habits ? (
					habits
						.filter((habit) => habit.temporality === TEMPORALITY_DAILY)
						.map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
				) : (
					<LoadingComponent />
				)}
			</Box>
			<NewHabitActionWrapper temporality={TEMPORALITY_DAILY}>
				<Button className='w-full shadow-md' variant='outline'>
					<BsPlusLg />
				</Button>
			</NewHabitActionWrapper>
			<Title temporality={TEMPORALITY_NIGHT} icon={<IoCloudyNightOutline />} />
			<Box>
				{habits ? (
					habits
						.filter((habit) => habit.temporality === TEMPORALITY_NIGHT)
						.map((habit, i) => <HabitSummaryCard key={i} habit={habit} />)
				) : (
					<LoadingComponent />
				)}
			</Box>
			<NewHabitActionWrapper temporality={TEMPORALITY_NIGHT}>
				<Button className='w-full shadow-md' variant='outline'>
					<BsPlusLg />
				</Button>
			</NewHabitActionWrapper>
		</Box>
	)
}

export default RightHandHabitsPanel
