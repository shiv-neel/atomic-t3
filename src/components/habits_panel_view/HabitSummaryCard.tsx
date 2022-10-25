import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Habit } from '../../models/Habit'
import MiniTimeSeriesView from './MiniTimeSeriesView'
import Link from 'next/link'

interface HabitType {
	habit: Habit
}

const HabitSummaryCard: React.FC<HabitType> = ({ habit }) => {
	const [percentChange, setPercentChange] = useState<number>(0)
	const [stonk, setStonk] = useState<number>(0)

	useEffect(() => {
		const getStonk = async () => {
			if (!habit || !habit.hid) return
			if (!lastHistory || !lastHistory.stonk) return
			setStonk(lastHistory.stonk)
		}
		getStonk()
	}, [habit])

	return (
		<Link href={`/habits/${habit.hid}`}>
			<Box className='w-72 space-y-5 py-2 cursor-pointer'>
				<Box className='flex justify-between mx-6'>
					<Box className='flex flex-col'>
						<p className='hover:underline'>{habit.hname}</p>
						<Box className='flex gap-2'>
							{habit.status !== '' ? (
								<p className='text-blue-500 font-semibold'>Submitted!</p>
							) : (
								<p className='text-red-500 font-semibold'>Not Submitted</p>
							)}
						</Box>
					</Box>
					<Box className='flex flex-col'>
						<p className='flex items-center ml-auto'>{stonk?.toFixed(2)}</p>
						<p className='flex items-center ml-auto gap-2'>{percentChange}%</p>
					</Box>
				</Box>
				<Box h={100}>
					<MiniTimeSeriesView hid={habit.hid} />
				</Box>
			</Box>
		</Link>
	)
}

export default HabitSummaryCard
