import { Box, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setGood, setIdentity, setName } from '../../features/formSlice'
import TextInput from './TextInput'

const HabitDefinition = () => {
	const selector = useSelector((state: any) => state.formValues)
	const dispatch = useDispatch()

	return (
		<Box className='flex w-full flex-col'>
			<p className='px-6 text-xl font-bold'>Habit Definition</p>
			<Box className='flex flex-col'>
				<TextInput
					label='Habit Name'
					value={selector.name}
					action={setName}
					placeholder={'Go to bed by 11:30 PM.'}
					description={'Define a simple, specific, and measurable habit.'}
				/>
				<TextInput
					label='New Identity'
					value={selector.identity}
					action={setIdentity}
					placeholder='I am a person who values my physical health.'
					description={
						'Your identity is the person you wish to become through building this habit.'
					}
				/>
				<Box className='flex w-full flex-col p-6'>
					<Box className='text-italic text-md my-2 flex items-center gap-3'>
						Habit Strategy
					</Box>
					<Box className='mb-3 text-sm italic text-gray-500'>
						Are you trying to build a good habit, or break a bad one?
					</Box>
					<Box className='flex gap-3'>
						<Button
							colorScheme={'green'}
							onClick={() => dispatch(setGood(true))}
							variant={selector.good ? 'solid' : 'ghost'}
							className={`${!selector.good ? 'underline' : ''}`}
						>
							Build a Good Habit
						</Button>
						<Button
							colorScheme={'red'}
							onClick={() => dispatch(setGood(false))}
							variant={selector.good ? 'ghost' : 'solid'}
							className={`${selector.good ? 'underline' : ''}`}
						>
							Break a Bad Habit
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default HabitDefinition
