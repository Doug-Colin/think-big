import { AppShell, Header, createStyles } from '@mantine/core'
import { create } from 'cypress/types/lodash'
import { SideNav, HeaderBar } from '~/components'

export const MainLayout = ({ children }) => {
	return (
		<AppShell padding='md' navbar={<SideNav />} header={<HeaderBar />}>
			{children}
		</AppShell>
	)
}
