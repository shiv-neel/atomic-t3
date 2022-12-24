import { Box, Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

const AppAppearance = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Box>
			<p className='mb-8 text-2xl font-bold'>Application Appearance</p>
			<Box className='mt-12 flex items-center gap-12'>
				<p>Color Mode</p>
				<Button
					colorScheme='messenger'
					variant='outline'
					onClick={toggleColorMode}
				>
					{colorMode === 'light' ? <BsSun /> : <BsMoon />}
				</Button>
			</Box>
		</Box>
	)
}

export default AppAppearance
