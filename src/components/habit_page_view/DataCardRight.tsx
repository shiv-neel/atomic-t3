import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { DEFAULT_STOCK } from '../../utils/constants'
import { HabitInfoProps } from './HabitInfo'

const DataCardRight: React.FC<HabitInfoProps> = ({ habit }) => {
	const [stonk, setStonk] = useState<number>(DEFAULT_STOCK)
	const [impliedVolatility, setImpliedVolatility] = useState<number>(0)

	// useEffect(() => {
	// 	const getStonkLocal = async () => {
	// 		if (!habit || !habit.hid) return
	// 		const todaysStonk = await getTodaysStonk(habit!.hid!)
	// 		setStonk(todaysStonk)
	// 	}
	// 	getStonkLocal()
	// }, [habit])

	return (
		<Box className='w-72'>
			<Box className='rounded-md p-5' borderWidth={'1px'}>
				<Box className='text-sm'>Total Return</Box>
				<Box className='text-lg'>${(stonk - DEFAULT_STOCK).toFixed(2)}</Box>
				<Box className='text-sm'>Implied Volatility</Box>
				<Box className='text-lg'>{impliedVolatility}</Box>
			</Box>
		</Box>
	)
}

export default DataCardRight
