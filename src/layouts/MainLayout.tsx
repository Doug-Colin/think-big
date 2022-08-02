import { AppShell, Center, Loader } from '@mantine/core'
import { SideNav, HeaderBar, CenterLoader } from '~/components'
import { useSession } from 'next-auth/react'

export const MainLayout = ({ children }) => {
	const { data: session, status } = useSession()
	if (status === 'loading') {
		return <CenterLoader />
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
