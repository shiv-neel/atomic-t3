import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const NewHabitForm = () => {
	return (
		<Box className='flex flex-col'>
			<Heading as='h1' className='mt-16'>
				Create New Habit
			</Heading>
		</Box>
	)
}

export default NewHabitForm
