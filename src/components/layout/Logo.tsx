import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { TbAtom2 } from 'react-icons/tb'
const Logo = () => {
	return (
		<Box>
			<Heading as='h1' className='flex items-center'>
				AT
				<TbAtom2 className='hover:rotate-90 duration-75' />
				MIC
			</Heading>
		</Box>
	)
}

export default Logo
