import { Box } from '@chakra-ui/react'
import React from 'react'
import { ResponsiveBump } from '@nivo/bump'
import { trpc } from '../utils/trpc'

interface Props {
	data: any
}

const Chart: React.FC<Props> = ({ data }) => {
	console.log(
		trpc.history.generateDataObjectFromHid.useQuery({
			hid: 'a8c649ad-7465-4133-aafa-0acf002d9665',
		})
	)
	return <Box></Box>
}

export default Chart
