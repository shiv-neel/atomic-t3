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
import NewHabitForm from './NewHabitForm'

interface TitleProps {
	text: string
	icon: any
}

const Title: React.FC<TitleProps> = ({ text, icon }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Box className='flex flex-col w-full'>
			<Box className='flex items-center justify-between mt-10'>
				<Box
					className='font-bold flex items-center gap-2 text-lg'
					textColor={'messenger.500'}
				>
					{icon}
					<p>{text}</p>
				</Box>
				<Button size='sm' variant='ghost' onClick={onOpen}>
					<BsPlusLg size='1rem' />
				</Button>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Add to {text}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<NewHabitForm text={text} onClose={onClose} />
						</ModalBody>
					</ModalContent>
				</Modal>
			</Box>
			<Divider my={4} />
		</Box>
	)
}

export default Title
