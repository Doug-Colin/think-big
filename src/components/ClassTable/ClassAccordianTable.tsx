import { useState } from 'react'
import {
	createStyles,
	Accordion,
	ActionIcon,
	ScrollArea,
	Table,
	Box,
} from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { UserClassStatusRecord } from '~/hooks'
import { Icon } from '@iconify/react'
import { DateTime } from 'luxon'
import { TagGroup } from '~/components'
import { ClassDetail } from './'

interface ClassAccordianTableProps {
	data: ClassRecord[]
	status: UserClassStatusRecord
}

const useStyles = createStyles((theme) => ({
	header: {
		position: 'sticky',
		top: 0,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		transition: 'box-shadow 150ms ease',

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[3]
					: theme.colors.gray[2]
			}`,
		},
	},

	scrolled: {
		boxShadow: theme.shadows.sm,
	},
	active: {
		backgroundColor: theme.colors.primary[6],
		'&:hover': {
			backgroundColor: theme.colors.primary[5],
		},
	},
	tablerow: {
		'&:hover': {
			backgroundColor: theme.colors.primary[3],
		},
	},
	modal: {
		height: '60vh',
	},
	fullHeight: {
		height: '100%',
	},
	modalClose: {
		color: theme.colors.secondary[4],
	},
}))

export const ClassAccordianTable = ({
	data,
	status,
}: ClassAccordianTableProps) => {
	const { classes, cx } = useStyles()
	const [scrolled, setScrolled] = useState(false)
	const [selectedRow, setSelectedRow] = useState('')
	const { classes: statusArr, id: userId } = status
	const classStatusMap = new Map(
		statusArr.map((item) => [item.id, item.status])
	)
	const statusIcon = new Map([
		['not_started', <Icon key='not_started' icon='fa6-solid:minus' />],
		['in_progress', <Icon key='in_progress' icon='fa6-solid:laptop-code' />],
		['done', <Icon key='done' icon='fa6-solid:flag-checkered' />],
	])

	const rows = data.map((row) => {
		const classStatus = classStatusMap.get(row.id) || 'not_started'
		const formattedDate = DateTime.fromISO(row.date.toString()).toFormat('DDDD')
		return (
			<Accordion.Item key={row.id} value={row.id}>
				<Accordion.Control>
					<tr key={row.id}>
						<td>
							<ActionIcon>{statusIcon.get(classStatus)}</ActionIcon>
						</td>
						<td>{row.classNum}</td>
						<td>{row.title}</td>
						<td>{formattedDate}</td>
						<td>
							<TagGroup tags={row.tags} />
						</td>
					</tr>
				</Accordion.Control>
				<Accordion.Panel>
					<ClassDetail
						classData={row}
						userId={userId}
						classStatus={classStatus}
					/>
				</Accordion.Panel>
			</Accordion.Item>
		)
	})

	return (
		<ScrollArea
			sx={{ height: '80vh' }}
			onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
		>
			<Table>
				<Accordion>
					<thead
						className={cx(classes.header, { [classes.scrolled]: scrolled })}
					>
						<tr>
							<th scope='column'>Status</th>
							<th scope='column'>Class</th>
							<th scope='column'>Description</th>
							<th scope='column'>Date</th>
							<th scope='column'>Tags</th>
						</tr>
					</thead>

					<tbody>{rows}</tbody>
				</Accordion>
			</Table>
		</ScrollArea>
	)
}
