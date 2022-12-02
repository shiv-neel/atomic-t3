import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Temporality, TEMPORALITY_LABELS } from '../utils/temporality'

interface Props {
	temporality: Temporality
}
const NewHabitForm: React.FC<Props> = ({ temporality }) => {
	console.log(temporality)
	return (
		<Box className='mx-16 flex flex-col lg:mx-24 xl:mx-48'>
			<Heading as='h1' className='mt-16'>
				Create New {TEMPORALITY_LABELS[temporality]} Habit
			</Heading>
		</Box>
	)
}

export default NewHabitForm

export async function getServerSideProps(context: any) {
	const temporality: Temporality = context.query.temporality
	console.log(context)
	return {
		props: {
			temporality,
		},
	}
}
