import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
// import MiniTimeSeriesView from '../../habits_panel_view/MiniTimeSeriesView'
import Link from 'next/link'
import { Habit } from '@prisma/client'
import { trpc } from '../../../utils/trpc'
import TimeSeriesPreview from './TimeSeriesPreview'

interface HabitType {
	habit: Habit
}

const HabitSummaryCard: React.FC<HabitType> = ({ habit }) => {
	const [percentChange, setPercentChange] = useState<number>(0)
	const [stock, setStock] = useState<number>(0)
	const [status, setStatus] = useState<boolean>(false)

	const _stock = trpc.data.getCurrentStockValue.useQuery({ hid: habit.id }).data

	const _percentChange = trpc.data.getPercentChangeOverRange.useQuery({
		hid: habit.id,
		range: 1,
	}).data

	useEffect(() => {
		if (!_stock || !_percentChange) return
		setStock(_stock.stock)
		setPercentChange(_percentChange.percentChange)
	}, [_stock, _percentChange])

	useEffect(() => {
		setStatus(habit.status !== '?')
	}, [habit.status])

	return (
		<Link href={`/habits/${habit.id}`}>
			<Box className='w-72 cursor-pointer space-y-5 py-2'>
				<Box className='mx-6 flex justify-between'>
					<Box className='flex flex-col'>
						<p className='hover:underline'>{habit.name}</p>
						<Box className='flex gap-2'>
							{habit.status === '?' ? (
								<p className='font-semibold text-red-500'>Not Submitted</p>
							) : (
								<p className='font-semibold text-blue-500'>Submitted!</p>
							)}
						</Box>
					</Box>
					<Box className='flex flex-col'>
						<p className='ml-auto flex items-center'>
							{stock ? stock.toFixed(2) : (0.0).toFixed(2)}
						</p>
						<p className='ml-auto flex items-center gap-2'>
							{percentChange > 0 ? '+' : ''}
							{percentChange.toFixed(2)}%
						</p>
					</Box>
				</Box>
				<Box h={100}>
					<TimeSeriesPreview hid={habit.id} />
				</Box>
			</Box>
		</Link>
	)
}

export default HabitSummaryCard
