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
    <Box className={`min-h-screen w-full ${bgc}`}>
      <Navbar />
      <Box className="mx-48">{children}</Box>
    </Box>
  );
}

export default Layout
