import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { MainLayout } from '~/layouts'

const App = (props: AppProps) => {
	const { Component, pageProps } = props
	return (
		<SessionProvider session={pageProps.session}>
			<Head>
				<title>Page title</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: 'light',
				}}
			>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</MantineProvider>
		</SessionProvider>
	)
}

export default App
