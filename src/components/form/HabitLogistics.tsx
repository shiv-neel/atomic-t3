import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { setGood } from '../../features/formSlice'
import BooleanInput from './BooleanInput'
import TextInput from './TextInput'

const HabitLogistics = () => {
	const selector = useSelector((state: any) => state.formValues)
	return (
		<Box className='flex w-full flex-col'>
			<p className='px-6 text-xl font-bold'>Habit Logistics</p>
			<Box className='flex flex-col'></Box>
		</Box>
	)
}
export default HabitLogistics
