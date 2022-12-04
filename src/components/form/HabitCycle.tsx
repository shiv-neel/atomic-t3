import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	useColorMode,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { BsArrowRight, BsArrowRightCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import {
	setCraving,
	setCue,
	setResponse,
	setReward,
} from '../../features/formSlice'
import PostitNote from './habit_cycle/PostitNote'
import TextInput from './TextInput'

const HabitCycle = () => {
	const selector = useSelector((state: any) => state.formValues)
	return (
		<Box className='flex w-full flex-col'>
			<p className='mb-6 px-6 text-xl font-bold'>Habit Cycle</p>
			<Accordion allowMultiple className='mb-12'>
				<AccordionItem>
					<AccordionButton>
						<Box className='flex gap-6'>What is a habit cycle?</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
			<Box className='flex h-full w-full items-center justify-center gap-6'>
				<PostitNote
					header='1. Cue'
					value={selector.cue}
					action={setCue}
					example='e.g. My alarm goes off at 7:00 AM.'
				/>
				<Box>
					<BsArrowRight className='text-6xl' />
				</Box>
				<PostitNote
					header='2. Craving'
					value={selector.craving}
					action={setCraving}
					example='I crave the feeling of alertness.'
				/>
				<Box>
					<BsArrowRight className='text-6xl' />
				</Box>
				<PostitNote
					header='3. Response'
					value={selector.response}
					action={setResponse}
					example='I immediately splash cold water on my face.'
				/>
				<Box>
					<BsArrowRight className='text-6xl' />
				</Box>
				<PostitNote
					header='4. Reward'
					value={selector.reward}
					action={setReward}
					example='I feel alert and ready to start my day.'
				/>
			</Box>
			<Box className='flex'>
				<TextInput label='1. Cue' value={selector.cue} action={setCue} />
				<TextInput
					label='2. Craving'
					value={selector.craving}
					action={setCraving}
				/>
			</Box>
			<Box className='flex'>
				<TextInput
					label='3. Response'
					value={selector.response}
					action={setResponse}
				/>
				<TextInput
					label='4. Reward'
					value={selector.reward}
					action={setReward}
				/>
			</Box>
		</Box>
	)
}

export default HabitCycle
