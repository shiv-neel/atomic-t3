import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import SignIn from './auth/signin'

const Home: NextPage = () => {
	const { data: session } = useSession()
	const user = session?.user

	const router = useRouter()

	if (user) {
		router.push('/dashboard')
	}

	return (
		<Box>
			welcome<br></br>
			<SignIn />
		</Box>
	)
}

export default Home
