import { Icon } from '@iconify/react'
import { Tooltip } from '@mantine/core'

interface Props {
	status: 'not_started' | 'in_progress' | 'done'
}

export const ClassStatusIcon = ({ status }) => {
	switch (status) {
		case 'not_started':
			return (
				<Tooltip label='Not started' withArrow>
					<Icon icon='fa6-solid:minus' />
				</Tooltip>
			)
		case 'in_progress':
			return (
				<Tooltip label='In progress' withArrow>
					<Icon icon='fa6-solid:laptop-code' />
				</Tooltip>
			)
		case 'done':
			return (
				<Tooltip label='Done' withArrow>
					<Icon icon='fa6-solid:flag-checkered' />
				</Tooltip>
			)
	}
}
