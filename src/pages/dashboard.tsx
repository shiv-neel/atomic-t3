import { Box, Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { trpc } from '../utils/trpc'

const Dashboard = () => {
	const { data: session } = useSession()
	const router = useRouter()
	useEffect(() => {
		if (!session) {
			router.push('/')
		}
	})

  const insertHistory = trpc.history.createFirstHistory.useMutation();
  const getAllHistory = trpc.history.getHistoryByHid.useQuery({
    hid: "a8c649ad-7465-4133-aafa-0acf002d9665",
  });

  const handleInsertHistory = async () => {
    insertHistory.mutate({
      hid: "a8c649ad-7465-4133-aafa-0acf002d9665",
      status: "-",
      stock: 9.9,
    });
  };

	const handleInsertHabit = async () => {
		try {
			insertHabit.mutate({
				craving: 'b',
				cue: 'b',
				duration: 4,
				location: 'v',
				name: 'b',
				response: 'c',
				reward: 'v',
				type: 'morning',
				userEmail: 'shiv.neel1622@gmail.com',
				stashed: false,
			})
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<Box>
			<Button onClick={handleInsertHabit}>insert habit</Button>
		</Box>
	)
}

export default Dashboard
