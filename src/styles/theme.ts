import { extendTheme } from '@chakra-ui/react'

import '@fontsource/karla'
import '@fontsource/libre-franklin'

export const theme = extendTheme({
	fonts: {
		body: 'Libre Franklin',
	},
})

export const getBackgroundHoverColor = (colorMode: string) => {
	return colorMode === 'light' ? 'bg-gray-100' : 'bg-gray-700'
}
