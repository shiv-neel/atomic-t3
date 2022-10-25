import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { BsPencil } from 'react-icons/bs'

interface DataRowProps {
	key_: string
	value: string
}

const DataRow: React.FC<DataRowProps> = ({ key_, value }) => {
	return (
		<Box className='flex'>
			<Box w={36} className='font-bold'>
				{key_}
			</Box>
			<Box color='messenger.500' mr={value && value.length ? 5 : 0}>
				{value}
			</Box>
			<Button size={'xs'}>
				<BsPencil />
			</Button>
		</Box>
	)
}

export default DataRow
