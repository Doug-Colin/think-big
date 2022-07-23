import {
	UnstyledButton,
	Group,
	Avatar,
	Menu,
	Button,
	Text,
	createStyles,
} from '@mantine/core'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import styles from './UserMenu.module.scss'

// This is Typescript stuff - don't worry about it.
interface LoggedInProps {
	image: string
	name: string
}
// end Typescript stuff

const useStyles = createStyles((theme) => ({
	userMenu: {
		// [ theme.fn.smallerThan( 'xs' ) ]: {
		//     display: 'none',
		// },
	},
	user: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : '',
		padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',
		'&:hover': {
			backgroundColor: theme.colors.primary[5],
			// theme.colorScheme === 'dark'
			// 	? theme.colors.dark[8]
			// 	: theme.colors.primary[6],
		},
	},
	userActive: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '',
	},
}))

const LoggedInUser = ({ image, name }: LoggedInProps) => {
	const [userMenuOpened, setUserMenuOpened] = useState(false)
	const { classes } = useStyles()

	return (
		<Menu
			size={260}
			placement='end'
			transition='pop-top-right'
			className={classes.userMenu}
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
			control={
				<UnstyledButton className={classes.user}>
					<Group>
						<Avatar
							src={image}
							radius='xl'
							alt={name}
							className={styles.avatarShadow}
						/>
						<Icon icon='tabler:chevron-down' />
					</Group>
				</UnstyledButton>
			}
		>
			<Menu.Item onClick={() => signOut({ callbackUrl: '/' })}>
				Logout
			</Menu.Item>
			{/* <Menu.Item>Item 2</Menu.Item> */}
		</Menu>
	)
}

const SignUpLoginButtons = () => {
	const { classes, theme } = useStyles()
	return (
		<Group>
			<Button
				variant='outline'
				color='highlightPrimary'
				onClick={() => signIn('discord', null, { prompt: 'consent' })}
			>
				Sign Up with Discord
			</Button>
			<Button
				onClick={() => signIn('discord', null, { prompt: 'none' })}
				variant='filled'
				color='highlightPrimary'
			>
				Log In with Discord
			</Button>
		</Group>
	)
}

export const UserMenu = () => {
	const { classes } = useStyles()
	const { data: session, status } = useSession()
	const { name, image } = session?.user || { name: '', image: '' }
	const menuControl = () => {
		if (status === 'authenticated') {
			return <LoggedInUser name={name} image={image} />
			// return <></>
		}
		if (status === 'unauthenticated') {
			return <SignUpLoginButtons />
		}
		return <Text>Loading...</Text>
	}
	return menuControl()
}
