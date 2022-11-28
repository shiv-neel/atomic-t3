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
import { IconType } from 'react-icons'
import { trpc } from '../../utils/trpc'
import { historyRouter } from '../../server/trpc/router/history'
import { Habit } from '@prisma/client'

interface CompleteHabitCardProps {
	habit: Habit
	submitted: boolean
	status: '+' | '-' | 'o' | '?'
	setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
	setStatus: React.Dispatch<React.SetStateAction<'+' | '-' | 'o' | '?'>>
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
		// set status and submitted properties upon mount
		if (!habit) return
		if (habit.status === '+' || habit.status === '-' || habit.status === 'o') {
			setStatus(habit.status)
			setSubmitted(true)
		} else {
			setStatus('?')
			setSubmitted(false)
		}
	}, [habit])

	const updateStatus = async () => {
		if (status === '?' || submitted) return
		setLoading(true)
		const historyCaller = historyRouter.createCaller({})
		const history = await historyCaller.createHistoryAndUpdateStock({hid: habit.id, status})
		setSubmitted(true)
		setLoading(false)
		onClose()
	}

	return (
		<Box className={`flex w-72 flex-col rounded-md p-4 shadow-md ${bgc}`}>
			<Box
				fontFamily={'Karla'}
				className='mt-4 mb-12 flex items-center justify-center gap-2 text-center text-xl font-bold'
			>
				<BsCalendar />
				{new Date().toDateString()}
			</Box>
			<Box className='flex flex-col items-center justify-start text-sm'>
				<Box className='mb-8 flex items-center justify-center gap-2'>
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
							<PopoverBody className='my-5 flex flex-col space-y-5'>
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
						className={`cursor-pointer hover:scale-110 ${
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
						className={`cursor-pointer hover:scale-110 ${
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
						className={`cursor-pointer hover:scale-110 ${
							status === 'o' ? 'shadow-xl' : 'shadow-sm'
						}`}
						onClick={() => setStatus('o')}
					>
						<BsCircle size='40' />
					</Button>
				</Box>
				<Box className='flex justify-center'>
					<Button
						className='mt-4 flex gap-2'
						onClick={onOpen}
						isDisabled={submitted}
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
