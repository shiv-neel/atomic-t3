import { Box, Divider, Heading, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import TextArea from '../components/form/TextArea'
import TextInput from '../components/form/TextInput'
import { Temporality, TEMPORALITY_LABELS } from '../utils/temporality'

interface Props {
	temporality: Temporality
}
const NewHabitForm: React.FC<Props> = ({ temporality }) => {
	const [name, setName] = useState<string>('')
	const [identity, setIdentity] = useState<string>('')

	return (
		<Box className='mx-16 flex flex-col lg:mx-24 xl:mx-48'>
			<Heading className='mt-16 mb-8'>
				Create New {TEMPORALITY_LABELS[temporality]} Habit
			</Heading>
			<Divider />
			<Box className='flex p-12'>
				<Box className='flex w-full flex-col'>
					<p className='px-6 text-xl font-bold'>Habit Definition</p>
					<Box className='flex'>
						<TextInput
							label='Habit Name'
							value={name}
							setValue={setName}
							placeholder={'Go to bed by 11:30 PM.'}
						/>
						<TextInput
							label='New Identity'
							value={identity}
							setValue={setIdentity}
							placeholder={'I am a person who values my physical health.'}
						/>
					</Box>
					<Box className='flex'>
						<p className='px-6 text-xl font-bold'>Habit Cycle</p>
						{/* put cue craving reward response component here */}
						<TextArea />
					</Box>
					<Box className='flex'>
						<TextInput label='Habit Name' value={name} setValue={setName} />
						<TextInput label='Habit Name' value={name} setValue={setName} />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default NewHabitForm

export async function getServerSideProps(context: any) {
	const temporality: Temporality = context.query.temporality
	return {
		props: {
			temporality,
		},
	}
}
