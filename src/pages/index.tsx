import { Box, Button } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import SignIn from './auth/signin'
import Link from 'next/link'
import * as crypto from 'crypto-js'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
	const { data: session } = useSession()
	const router = useRouter()
	const user = session?.user

	if (user) {
		router.push('/dashboard')
	}

	return (
		<Box>
			welcome<br></br>
			<Link href='/auth/signin'>
				<Button>Sign in</Button>
			</Link>
		</Box>
	)
}

export default Home
