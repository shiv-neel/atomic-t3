import { Box, Button, Divider, FormControl, Heading } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { InputField } from '../../components/form/InputField'
import { trpc } from '../../utils/trpc'
import { AES } from 'crypto-js'

const SignIn = () => {
	const { data: session } = useSession()
	const user = session?.user
	const router = useRouter()
	const lastLoginUpdateMutation = trpc.user.updateLastLogin.useMutation()

	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLoading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	useEffect(() => {
		if (session && session.user) {
			lastLoginUpdateMutation.mutate({ email: session.user.email! })
			router.push('/dashboard')
		}
	}, [session])

	const hashPassword = trpc.user.comparePasswords.useQuery({
		password: password,
		hashedPassword: 'U2FsdGVkX18dCD8TsSNLaByfHviNNmVIdRqjlffdlpw=',
	})

	const handleSignIn = async (e: any) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		// const attemptLoginResponse = attemptLogin.data
		// if (attemptLoginResponse?.success) {
		// 	setLoading(false)
		// 	console.log(attemptLoginResponse)
		// }
		// console.log(attemptLoginResponse)
	}

	return (
		<Box w={'lg'} className='border-1 mx-auto flex flex-col justify-center p-5'>
			<Heading as='h1' className='flex justify-center'>
				Sign In
			</Heading>
			<Divider my={6} />
			<FormControl>
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
				<p className='font-bold text-red-500'>{error && error}</p>
				<Button
					my={4}
					type='submit'
					isLoading={isLoading}
					colorScheme={'messenger'}
					onClick={handleSignIn}
				>
					Sign In
				</Button>
			</FormControl>
			<p>
				Don&apos;t have an account yet?{' '}
				<Link href='/auth/signup' passHref>
					<a className='underline'>Sign Up</a>
				</Link>
			</p>
		</Box>
	)
}

export default SignIn
