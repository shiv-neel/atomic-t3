import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import NewHabitForm from './NewHabitForm'

interface NewHabitModalProps {
	isOpen: boolean
	onClose: () => void
	text: string
}

const NewHabitModal: React.FC<NewHabitModalProps> = ({
	isOpen,
	onClose,
	text,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size='3xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add to {text}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<NewHabitForm text={text} onClose={onClose} />
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default NewHabitModal
