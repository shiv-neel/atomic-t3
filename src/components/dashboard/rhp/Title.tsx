import {
	Box,
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { BsPlusLg } from 'react-icons/bs'
import { Temporality, TEMPORALITY_LABELS } from '../../../utils/temporality'
import NewHabitForm from '../../habits_panel_view/NewHabitForm'
import NewHabitActionWrapper from './NewHabitActionWrapper'

interface TitleProps {
	temporality: Temporality
	icon: any
}

const Title: React.FC<TitleProps> = ({ temporality, icon }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Box className='flex w-full flex-col'>
			<Box className='mt-10 flex items-center justify-between'>
				<Box
					className='flex items-center gap-2 text-lg font-bold'
					textColor={'messenger.500'}
				>
					{icon}
					<p>{TEMPORALITY_LABELS[temporality]} Habit Stack</p>
				</Box>
				<NewHabitActionWrapper temporality={temporality}>
					<Button size='sm' variant='ghost' onClick={onOpen}>
						<BsPlusLg size='1rem' />
					</Button>
				</NewHabitActionWrapper>
			</Box>
			<Divider my={4} />
		</Box>
	)
}

export default Title
