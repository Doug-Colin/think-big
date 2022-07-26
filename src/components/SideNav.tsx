import React, { useState } from 'react'
import {
	Navbar,
	Tooltip,
	UnstyledButton,
	createStyles,
	Stack,
} from '@mantine/core'
import { Icon } from '@iconify/react'
import { mocknav } from 'mockdata/nav'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
	link: {
		width: 50,
		height: 50,
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// color: theme.white,
		opacity: 0.85,

		'&:hover': {
			opacity: 1,
			backgroundColor: theme.colors.primary[5],
			svg: {
				color: theme.colors.secondary[1],
			},
		},
	},
	active: {
		opacity: 1,
		'&, &:hover': {
			backgroundColor: theme.colors.primary[7],
		},
	},
	icon: {
		fontSize: '1.75rem',
		color: theme.colors.primary[0],
	},
}))

interface NavbarLinkProps {
	icon: string
	label: string
	active?: boolean
	url?: string
	onClick?(): void
}

export function NavbarLink({
	icon,
	label,
	active,
	url,
	onClick,
}: NavbarLinkProps) {
	const { classes, cx } = useStyles()
	return (
		<Link href={url} passHref>
			<UnstyledButton
				component='a'
				className={cx(classes.link, { [classes.active]: active })}
				onClick={onClick}
			>
				<Tooltip
					label={label}
					position='right'
					withArrow
					transitionDuration={0}
				>
					<div>
						<Icon icon={icon} className={classes.icon} />
					</div>
				</Tooltip>
			</UnstyledButton>
		</Link>
	)
}

const useNavbarStyles = createStyles((theme) => ({
	navbar: {
		backgroundColor: theme.colors.primary[6],
		margin: 'none',
	},
}))

export function SideNav() {
	const [active, setActive] = useState(0)
	const { classes } = useNavbarStyles()
	const links = mocknav.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => setActive(index)}
		/>
	))

	return (
		<Navbar
			fixed={false}
			width={{ base: 80 }}
			p='md'
			className={classes.navbar}
		>
			<Stack align='center' spacing='md'>
				{links}
			</Stack>
		</Navbar>
	)
}
