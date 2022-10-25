import { Box, Button, ButtonGroup, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

const AppAppearance = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Box>
			<p className='text-2xl font-bold mb-8'>Application Appearance</p>
			<Box className='flex items-center gap-12 mt-12'>
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
