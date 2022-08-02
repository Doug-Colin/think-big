import { AppShell, Center, Loader } from '@mantine/core'
import { SideNav, HeaderBar } from '~/components'
import { useSession } from 'next-auth/react'

export const MainLayout = ({ children }) => {
	const { data: session, status } = useSession()
	if (status === 'loading') {
		return (
			<Center style={{ width: '100vw', height: '100vh' }}>
				<Loader size='xl' />
			</Center>
		)
	}
	return (
		<AppShell
			padding='md'
			fixed={false}
			navbar={session && <SideNav />}
			header={<HeaderBar />}
		>
			{children}
		</AppShell>
	)
}
