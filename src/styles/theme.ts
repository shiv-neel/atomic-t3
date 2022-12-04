import { extendTheme } from '@chakra-ui/react'

import '@fontsource/karla'
import '@fontsource/libre-franklin'
import '@fontsource/klee-one'

export const theme = extendTheme({
	fonts: {
		heading: 'Libre Franklin',
		body: 'Libre Franklin',
		handwriting: 'Klee One',
	},
})

export const getBackgroundHoverColor = (colorMode: string) => {
	return colorMode === 'light' ? 'bg-gray-100' : 'bg-gray-700'
}
