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
} from '@chakra-ui/react'
import React from 'react'

interface DeleteFormProps {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	deleteStuff: () => Promise<void>
	whichStuff: 'data' | 'account'
	loading: boolean
}

const DeleteForm: React.FC<DeleteFormProps> = ({
	isOpen,
	onOpen,
	onClose,
	deleteStuff,
	whichStuff,
	loading,
}) => {
	const deleteDataMessage =
		'You will still have access to your account, but all habits and their data will be deleted. This action cannot be undone.'

	const deleteAccountMessage =
		'You will no longer have access to your account, habits, or habit data. This action cannot be undone.'
	return (
		<Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						Delete {whichStuff === 'data' ? 'All Habit Data' : 'my Account'}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<p className='text-red-600'>
							{whichStuff === 'data' ? deleteDataMessage : deleteAccountMessage}
						</p>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='messenger' mr={3} onClick={onClose}>
							Nevermind
						</Button>
						<Button variant='ghost' onClick={deleteStuff} isLoading={loading}>
							Do it
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	)
}

export default DeleteForm
