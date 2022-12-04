import { Box, Button, Input } from '@chakra-ui/react'
import { BsQuestionCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

export interface FormInputProps {
	label: string
	value: string
	action: (e: string) => any
	placeholder?: string
	description?: string
}

const TextInput: React.FC<FormInputProps> = ({
	label,
	value,
	action,
	placeholder,
	description,
}) => {
	const dispatch = useDispatch()
	return (
		<Box className='flex w-full flex-col p-6'>
			<Box className='text-italic text-md my-2 flex items-center gap-3'>
				{label}
			</Box>
			<Box className='mb-3 text-sm italic text-gray-500'>{description}</Box>
			<Input
				variant='outline'
				onChange={(e) => dispatch(action(e.target.value))}
				value={value}
				placeholder={placeholder}
			/>
		</Box>
	)
}

export default TextInput
