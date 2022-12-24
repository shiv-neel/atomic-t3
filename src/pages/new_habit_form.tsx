import { Box, Button, Divider, Heading, Input } from '@chakra-ui/react'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsPlus } from 'react-icons/bs'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { VscPreview } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import HabitCycle from '../components/form/HabitCycle'
import HabitDefinition from '../components/form/HabitDefinition'
import HabitLogistics from '../components/form/HabitLogistics'
import NavBtns from '../components/form/NavBtns'
import ReviewForm from '../components/form/ReviewForm'

import { setTemporality } from '../features/formSlice'
import { Temporality, TEMPORALITY_LABELS } from '../utils/temporality'

interface Props {
	temporality: Temporality
}

const NewHabitForm: React.FC<Props> = ({ temporality }) => {
	const selector = useSelector((state: any) => state.formValues)
	const dispatch = useDispatch()
	useEffect(() => {
		if (typeof window !== undefined && !TEMPORALITY_LABELS[temporality]) {
			Router.push('/dashboard')
		}
		dispatch(setTemporality(temporality))
	}, [temporality])

	const [pageIndex, setPageIndex] = useState<number>(0)

	const pages = [
		<HabitDefinition key={0} />,
		<HabitCycle key={1} />,
		<HabitLogistics key={2} />,
		<ReviewForm key={3} />,
	]

	const submitHabit = () => {
		// TODO: submit backend logic
		Router.push('/dashboard')
	}

	return (
		<Box className='mx-16 flex flex-col lg:mx-24 xl:mx-48'>
			<Button onClick={() => console.log(selector)}>Log Form State</Button>
			<Heading className='mt-16 mb-8' fontFamily={'heading'}>
				Create New {TEMPORALITY_LABELS[temporality]} Habit
			</Heading>
			<Divider />
			<Box className='flex flex-col p-12'>
				<NavBtns
					pageIndex={pageIndex}
					setPageIndex={setPageIndex}
					numPages={pages.length}
				/>
				{pages[pageIndex]}
				<NavBtns
					pageIndex={pageIndex}
					setPageIndex={setPageIndex}
					numPages={pages.length}
				/>
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
