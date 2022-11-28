import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { trpc } from '../utils/trpc'

const playground = () => {
	const createHistoryAndUpdateStock =
		trpc.history.createHistoryAndUpdateStock.useMutation()

	const handle = () => {
		createHistoryAndUpdateStock.mutate({
			hid: 'a8c649ad-7465-4133-aafa-0acf002d9665',
			status: '+',
		})
	}
	return (
		<Box>
			<Button onClick={handle}>Create new history and update stock</Button>
		</Box>
	)
}

export default playground
