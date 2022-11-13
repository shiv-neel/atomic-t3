import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc'
import Dashboard from './dashboard'
import Welcome from './welcome'

const Home: NextPage = () => {
	const { data: session } = useSession()
	const router = useRouter()
	const user = session?.user
	return <Box>{session ? <Dashboard /> : <Welcome />}</Box>
}

export default Home
