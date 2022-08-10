import { AppShell } from '@mantine/core'
import { SideNav, HeaderBar, CenterLoader } from '~/components'
import { useSession } from 'next-auth/react'
import React from 'react'

interface LayoutProps {
	children: React.ReactNode
}

export const MainLayout = ({ children }: LayoutProps) => {
	const { data: session, status } = useSession()
	if (status === 'loading' && !session) {
		return <CenterLoader />
	}
	return (
		<AppShell
			padding='md'
			fixed={false}
			navbar={(session && <SideNav />) || undefined}
			header={<HeaderBar />}
		>
			{children}
		</AppShell>
	)
}
