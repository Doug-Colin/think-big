import { useState } from 'react'
import { createStyles, Table, ScrollArea, Text, Title } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { TagGroup, ClassDetail } from '~/components'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchClasses, useClasses } from '~/hooks'
import { DateTime } from 'luxon'
import superjson from 'superjson'

export async function getServerSideProps() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['classes'], fetchClasses)
	const queryState = dehydrate(queryClient)
	const serializedQueryState = superjson.stringify(queryState)

	return {
		props: {
			dehydratedState: serializedQueryState,
		},
	}
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

interface TableScrollAreaProps {
	data: ClassRecord[]
}
export function TableScrollArea({ data }: TableScrollAreaProps) {
	const { classes, cx } = useStyles()
	const [scrolled, setScrolled] = useState(false)
	const [selectedRow, setSelectedRow] = useState('')

	const rows = data.map((row) => {
		const formattedDate = DateTime.fromISO(row.date.toString()).toFormat('DDDD')
		return (
			<tr
				key={row.id}
				onClick={() => {
					setSelectedRow(row.id)
					openModal({
						title: (
							<Title order={1}>{`Class ${row.classNum} - ${row.title}`}</Title>
						),
						children: <ClassDetail classData={row} />,
						centered: true,
						size: '60vw',
						classNames: {
							modal: classes.modal,
							body: classes.fullHeight,
							close: classes.modalClose,
						},
						transition: 'pop',
						transitionDuration: 400,
					})
				}}
				className={row.id === selectedRow ? classes.active : classes.tablerow}
			>
				<td>{row.status}</td>
				{/* This will return a react component for the Status */}
				<td>{row.classNum}</td>
				<td>{row.title}</td>
				<td>{row.materialLinks[0]?.url}</td>
				{/* may need to map again - this returns an array */}
				<td>{formattedDate}</td>
				<td>
					<TagGroup tags={row.tags} />
				</td>
				{/* this will eventually display using the TagGroup component, passing in the tags as props*/}
			</tr>
		)
	})

	return (
		<ScrollArea
			sx={{ height: '80vh' }}
			onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
		>
			<Table>
				<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
					<tr>
						<th>Status</th>
						<th>Class</th>
						<th>Description</th>
						<th>Materials</th>
						<th>Date</th>
						<th>Tags</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
			{/* <ClassDetail classData={classItem} open={modalOpen} /> */}
		</ScrollArea>
	)
}

const ClassTable = () => {
	const { data, isLoading, isError, error } = useClasses()
	if (isLoading) return <Text>Loading...</Text>
	if (isError) return <Text>{`Error: ${error}`}</Text>
	return <TableScrollArea data={data} />
}

export default ClassTable
