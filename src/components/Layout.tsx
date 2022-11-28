import { Box, useColorMode } from '@chakra-ui/react'
import React from 'react'
import Navbar from './layout/Navbar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { colorMode } = useColorMode()
	const bgc = colorMode === 'light' ? 'bg-white' : 'bg-black'
	return (
		<Box className={`min-h-screen w-full ${bgc} mx-auto lg:px-24`}>
			<Navbar />
			<Box className='mt-12'>{children}</Box>
		</Box>
	)
}

export default Layout
