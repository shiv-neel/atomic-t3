import { Box, Button, Input } from '@chakra-ui/react'
import React from 'react'
import { BsQuestionCircleFill } from 'react-icons/bs'

interface Props {
	label: string
	value: string
	setValue: (value: string) => void
	placeholder?: string
}

const TextInput: React.FC<Props> = ({ label, value, setValue }) => {
	return (
		<Box className='flex w-full flex-col p-6'>
			<Box className='text-italic my-2 flex items-center gap-3 text-sm italic text-gray-600'>
				{label}
				<Button variant='unstyled' className='hover:text-blue-500'>
					<BsQuestionCircleFill />
				</Button>
			</Box>
			<Input
				variant='filled'
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
		</Box>
	)
}

export default TextInput
