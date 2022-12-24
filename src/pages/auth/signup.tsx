import { Box, Button, Divider, FormControl, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { InputField } from '../../components/form/InputField'

const Signup = () => {
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false)
	const [isLoading, setLoading] = useState<boolean>(false)
	const [fname, setFirstName] = useState<string>('')
	const [lname, setLastName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const [error, setError] = useState<string>('')

	const checkPasswordsMatch = (): boolean => {
		return password === confirmPassword
	}

	const handleSignUp = async (): Promise<void> => {
		setError('')
		setLoading(true)
		// TODO: Add logic to check if passwords match
	}

	return (
		<Box w={'lg'} className='border-1 mx-auto flex flex-col justify-center p-5'>
			<Heading as='h1' className='flex justify-center'>
				Sign Up
			</Heading>
			<Divider my={6} />
			<FormControl>
				<Box className='flex w-full columns-2 items-end gap-5'>
					<InputField
						name='firstname'
						placeholder='Enter First Name'
						label='Full Name'
						type='text'
						setState={setFirstName}
					/>
					<InputField
						name='lastname'
						placeholder='Enter Last Name'
						label=''
						type='text'
						setState={setLastName}
					/>
				</Box>
				<InputField
					name='email'
					placeholder='Enter e-mail address'
					label='E-mail'
					type='email'
					setState={setEmail}
				/>
				<InputField
					name='password'
					placeholder='Enter password'
					label='Password'
					type='password'
					setState={setPassword}
				/>
				<InputField
					name='confirmPassword'
					placeholder='Confirm password'
					label='Confirm Password'
					type='password'
					setState={setConfirmPassword}
				/>
				{error ? <p className='font-bold text-red-600'>{error}</p> : <></>}
				<Button
					my={4}
					type='submit'
					isLoading={isLoading}
					colorScheme={'messenger'}
					onClick={handleSignUp}
				>
					Sign Up
				</Button>
			</FormControl>

			<p>
				Already have an account?{' '}
				<Link href='/signin' passHref>
					<a className='underline'>Sign In</a>
				</Link>
			</p>
		</Box>
	)
}

export default Signup
