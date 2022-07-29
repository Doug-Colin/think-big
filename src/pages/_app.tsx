import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { useState } from 'react'
import { MainLayout } from '~/layouts'
import { baseTheme } from '~/style'
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App = (props: AppProps) => {
	const { Component, pageProps } = props
	const preferredColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme)
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
			})
	)

	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>Page title</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					{/* <ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			> */}
					<MantineProvider
						withCSSVariables
						withGlobalStyles
						withNormalizeCSS
						theme={baseTheme}
					>
						<ModalsProvider>
							<MainLayout>
								<Component {...pageProps} />
								<ReactQueryDevtools initialIsOpen={false} />
							</MainLayout>
						</ModalsProvider>
					</MantineProvider>
				</Hydrate>
				{/* </ColorSchemeProvider> */}
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default App
