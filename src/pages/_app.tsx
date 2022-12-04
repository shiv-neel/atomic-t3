// src/pages/_app.tsx
import '../styles/globals.css'
import type { AppType } from 'next/app'
import { trpc } from '../utils/trpc'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'
import { theme } from '../styles/theme'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '../redux/store'

const MyApp: AppType = ({
	Component,
	pageProps: { session, ...pageProps },
}: any) => {
	return (
		<ChakraProvider theme={theme}>
			<SessionProvider session={session}>
				<Provider store={store}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</SessionProvider>
		</ChakraProvider>
	)
}

export default trpc.withTRPC(MyApp)
