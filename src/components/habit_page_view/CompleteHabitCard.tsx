import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
	BsCalendar,
	BsCircle,
	BsPlusCircle,
	BsDashCircle,
} from 'react-icons/bs'
import { FaRegPaperPlane } from 'react-icons/fa'
import { BiLockAlt } from 'react-icons/bi'
import { Habit } from '../../models/Habit'
import { IconType } from 'react-icons'
import { supabase } from '../../utils/supabase'
import { updateTodaysHistory } from '../../utils/habit_resolver'

interface CompleteHabitCardProps {
	habit: Habit | undefined
	submitted: boolean
	status: '+' | '-' | 'o' | ''
	setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
	setStatus: React.Dispatch<React.SetStateAction<'+' | '-' | 'o' | ''>>
}

const CompleteHabitCard: React.FC<CompleteHabitCardProps> = ({
	habit,
	submitted,
	status,
	setSubmitted,
	setStatus,
}) => {
	const [isLoading, setLoading] = useState<boolean>(false)
	const { colorMode, toggleColorMode } = useColorMode()
	const bgc = colorMode === 'light' ? 'bg-slate-50' : 'bg-slate-900'

	const { isOpen, onOpen, onClose } = useDisclosure()

	const statusToIconMap = {
		'+': <BsPlusCircle size='20' />,
		'-': <BsDashCircle size='20' />,
		o: <BsCircle size='20' />,
	} as { [key in string]: JSX.Element }

	useEffect(() => {
		if (!habit) return
		if (habit.status === '+' || habit.status === '-' || habit.status === 'o') {
			setStatus(habit.status)
			setSubmitted(true)
		} else {
			setStatus('')
			setSubmitted(false)
		}
	}, [habit])

	const updateStatus = async () => {
		if (status === '' && submitted) return
		setLoading(true)
		const history = await updateTodaysHistory(habit!.hid!, status)
		setSubmitted(true)
		setLoading(false)
		onClose()
	}

	return (
		<Box className={`flex flex-col w-72 p-4 rounded-md shadow-md ${bgc}`}>
			<Box
				fontFamily={'Karla'}
				className='text-xl font-bold text-center mt-4 mb-12 flex items-center gap-2 justify-center'
			>
				<BsCalendar />
				{new Date().toDateString()}
			</Box>
			<Box className='flex flex-col justify-start text-sm items-center'>
				<Box className='flex items-center justify-center gap-2 mb-8'>
					<Box className='text-lg'>Submit Today&apos;s Status</Box>
					<Popover>
						<PopoverTrigger>
							<Button w={4} size='xs' rounded={100} colorScheme='messenger'>
								?
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>Status Types</PopoverHeader>
							<PopoverBody className='flex flex-col space-y-5 my-5'>
								<Box className='text-md flex gap-2 font-semibold'>
									<BsPlusCircle size='20' /> Successfully completed habit
								</Box>
								<Box className='text-md flex gap-2 font-semibold'>
									<BsDashCircle size='20' /> Missed habit
								</Box>
								<Box className='text-md flex gap-2 font-semibold'>
									<BsCircle size='20' /> Missed habit for external reason
								</Box>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</Box>
				<Box className='flex gap-7'>
					<Button
						isDisabled={submitted}
						variant='unstyled'
						color={status === '+' ? 'messenger.500' : ''}
						rounded={100}
						className={`hover:scale-110 cursor-pointer ${
							status === '+' ? 'shadow-xl' : 'shadow-sm'
						}`}
						onClick={() => setStatus('+')}
					>
						<BsPlusCircle size='40' />
					</Button>
					<Button
						isDisabled={submitted}
						variant='unstyled'
						color={status === '-' ? 'messenger.500' : ''}
						rounded={100}
						className={`hover:scale-110 cursor-pointer ${
							status === '-' ? 'shadow-xl' : 'shadow-sm'
						}`}
						onClick={() => setStatus('-')}
					>
						<BsDashCircle size='40' />
					</Button>
					<Button
						isDisabled={submitted}
						variant='unstyled'
						color={status === 'o' ? 'messenger.500' : ''}
						rounded={100}
						className={`hover:scale-110 cursor-pointer ${
							status === 'o' ? 'shadow-xl' : 'shadow-sm'
						}`}
						onClick={() => setStatus('o')}
					>
						<BsCircle size='40' />
					</Button>
				</Box>
				<Box className='flex justify-center'>
					<Button
						className='flex gap-2 mt-4'
						onClick={onOpen}
						isDisabled={(status === '' && !submitted) || submitted}
						colorScheme='messenger'
					>
						{submitted ? (
							<Box className='flex gap-2'>
								<FaRegPaperPlane /> Submitted!
							</Box>
						) : (
							<Box className='flex gap-2'>
								<BiLockAlt /> Lock Today&apos;s Status
							</Box>
						)}
					</Button>
				</Box>
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Lock Status</ModalHeader>
					<ModalCloseButton />
					<ModalBody className='flex flex-col space-y-5'>
						<Box className='flex items-center gap-2'>
							Are you sure you want to lock today&apos;s status as
							{statusToIconMap[status]}?
						</Box>
						<Box>
							{status === 'o' ? (
								<Box className='space-y-2'>
									<p className='text-sm font-bold text-red-500'>
										Please note that this status should ONLY be submitted in
										cases where missing the habit was out of your control.
									</p>
									<p className='text-sm italic'>
										(e.g. you were out of town, ran out of an essential item for
										completing the habit, etc.)
									</p>
								</Box>
							) : (
								''
							)}
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button
							isLoading={isLoading}
							colorScheme='messenger'
							mr={3}
							onClick={updateStatus}
						>
							Do it
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Nevermind
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default CompleteHabitCard
