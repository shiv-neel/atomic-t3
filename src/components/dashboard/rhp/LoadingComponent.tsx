import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingComponent = () => {
	return (
		<Box className='jusify-center mb-4 flex' color='messenger.500'>
			<Spinner size='lg' />
		</Box>
	)
}

export default LoadingComponent
