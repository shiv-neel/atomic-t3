import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { DEFAULT_STONK } from '../../models/Habit'
import { getLastHistory, getTodaysStonk } from '../../utils/habit_resolver'
import { HabitInfoProps } from './HabitInfo'

const DataCardRight: React.FC<HabitInfoProps> = ({ habit }) => {
	const [stonk, setStonk] = useState<number>(DEFAULT_STONK)
	const [impliedVolatility, setImpliedVolatility] = useState<number>(0)

	useEffect(() => {
		const getStonkLocal = async () => {
			if (!habit || !habit.hid) return
			const todaysStonk = await getTodaysStonk(habit!.hid!)
			setStonk(todaysStonk)
		}
		getStonkLocal()
	}, [habit])

	return (
		<Box className='w-72'>
			<Box className='p-5 rounded-md' borderWidth={'1px'}>
				<Box className='text-sm'>Total Return</Box>
				<Box className='text-lg'>${(stonk - DEFAULT_STONK).toFixed(2)}</Box>
				<Box className='text-sm'>Implied Volatility</Box>
				<Box className='text-lg'>{impliedVolatility}</Box>
			</Box>
		</Box>
	)
}

export default DataCardRight
