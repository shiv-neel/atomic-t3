import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { HabitInfoProps } from './HabitInfo'

const DataCardLeft: React.FC<HabitInfoProps> = ({ habit, submitted }) => {
	const [stonk, setStonk] = useState<number>()
	const [startDate, setStartDate] = useState<string>('')

	// useEffect(() => {
	// 	const getStonkLocal = async () => {
	// 		if (!habit || !habit.hid) return
	// 		const todaysStonk = await getTodaysStonk(habit!.hid!)
	// 		setStonk(todaysStonk)
	// 	}

	// 	const getDateLocal = async () => {
	// 		if (!habit || !habit.hid) return
	// 		const date = await getStartDate(habit!.hid!)
	// 		setStartDate(new Date(date).toLocaleDateString())
	// 	}
	// 	getStonkLocal()
	// 	getDateLocal()
	// }, [habit, submitted])

	return (
		<Box className='w-72'>
			<Box className='rounded-md p-5' borderWidth={'1px'}>
				<Box className='text-sm'>Your market value</Box>
				<Box className='text-lg'>${stonk?.toFixed(2)}</Box>
				<Box className='text-sm'>Start Date</Box>
				<Box className='text-lg'>{startDate}</Box>
			</Box>
		</Box>
	)
}

export default DataCardLeft
