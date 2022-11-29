import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { STATUS_SUCCESS } from '../utils/status'
import { trpc } from '../utils/trpc'

const playground = () => {
	const createHistoryAndUpdateStock =
		trpc.history.createHistoryAndUpdateStock.useMutation()

	const handle = () => {
		createHistoryAndUpdateStock.mutate({
			hid: 'a8c649ad-7465-4133-aafa-0acf002d9665',
			status: STATUS_SUCCESS,
		})
	}
	return (
		<Box>
			<Button onClick={handle}>Create new history and update stock</Button>
		</Box>
	)
}

export default playground
