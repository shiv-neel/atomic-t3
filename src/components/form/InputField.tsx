import React, { InputHTMLAttributes, useState } from 'react'
import { useField } from 'formik'
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
	InputGroup,
	InputRightElement,
	Button,
} from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string
	name: string
	type: string
	placeholder: string
	setState: React.Dispatch<React.SetStateAction<string>>
}

export const InputField: React.FC<InputFieldProps> = ({
	label,
	name,
	type,
	placeholder,
	setState,
}) => {
	const [show, setShow] = useState<boolean>(false)

	return (
		<FormControl my={3}>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<InputGroup size='md'>
				<Input
					isRequired
					placeholder={placeholder}
					type={
						name === 'password' || name === 'confirmPassword'
							? show
								? 'text'
								: 'password'
							: type
					}
					onChange={(e: any) => setState(e.target.value)}
				/>
				{name === 'password' || name === 'confirmPassword' ? (
					<InputRightElement width='3.5rem'>
						<Button h='2.5rem' size='sm' onClick={() => setShow((s) => !s)}>
							{show ? (
								<AiOutlineEyeInvisible className='text-3xl' />
							) : (
								<AiOutlineEye className='text-3xl' />
							)}
						</Button>
					</InputRightElement>
				) : (
					<></>
				)}
			</InputGroup>
		</FormControl>
	)
}
