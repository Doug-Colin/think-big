import { SessionProvider, useSession } from 'next-auth/react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { MainLayout } from '~/layouts'
import { baseTheme } from '~/style'
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CenterLoader } from '~/components'
import type { ComponentWithAuth } from 'types/customComponents'
import type { NextPageContext, NextComponentType } from 'next'

export type NextComponentWithAuth = NextComponentType<
	NextPageContext,
	any,
	{}
> &
	ComponentWithAuth
type AppPropsWithAuth = AppProps & { Component: NextComponentWithAuth }

const handleAuth = (
	role = 'USER',
	loader = <CenterLoader />,
	redirectTo = 'signin'
) => {}

const Auth: ComponentWithAuth = ({ children, auth }) => {
	const {
		role = 'USER',
		loader = <CenterLoader />,
		redirectTo = 'signin',
	} = auth
	const { data: session, status } = useSession()
	const router = useRouter()
	const signinUrl = '/api/auth/signin?Error=SessionRequired'
	const accessdeniedUrl = '/api/auth/error?Error=AccessDenied'
	const notificationSignIn = {
		title: 'Auth required',
		message: `Things may not work correctly - if this wasn't a dev environment, you'd be kicked to the SignIn page right now.`,
		color: 'red',
	}
	const notificationAccessDenied = {
		title: 'Elevated user role required',
		message: `This would normally need 'MOD' or 'ADMIN' permissions - if this wasn't a dev environment, you'd be kicked to the Access Denied error page right now.`,
		color: 'red',
	}
	switch (status) {
		case 'loading':
			return loader
		case 'authenticated':
			if (session.user.role === role) return children
			process.env.NODE_ENV === 'development'
				? showNotification(notificationAccessDenied)
				: router.push(accessdeniedUrl)
		case 'unauthenticated':
			if (redirectTo === 'signin')
				return process.env.NODE_ENV === 'development'
					? showNotification(notificationSignIn)
					: router.push(signinUrl)
			process.env.NODE_ENV === 'development'
				? showNotification(notificationAccessDenied)
				: router.push(accessdeniedUrl)
	}
}

const App = (props: AppPropsWithAuth) => {
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
				<title>thinkBig</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<ColorSchemeProvider
						colorScheme={colorScheme}
						toggleColorScheme={toggleColorScheme}
					>
						<MantineProvider
							withCSSVariables
							withGlobalStyles
							withNormalizeCSS
							theme={baseTheme}
						>
							<NotificationsProvider position='top-center'>
								<ModalsProvider>
									<MainLayout>
										{Component.auth?.required ? (
											<Auth auth={Component.auth}>
												<Component {...pageProps} />
											</Auth>
										) : (
											<Component {...pageProps} />
										)}
										<ReactQueryDevtools initialIsOpen={false} />
									</MainLayout>
								</ModalsProvider>
							</NotificationsProvider>
						</MantineProvider>
					</ColorSchemeProvider>
				</Hydrate>
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default App
