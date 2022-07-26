import { useState } from 'react'
import { createStyles, Table, ScrollArea, Text } from '@mantine/core'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { fetchClasses } from '~/hooks'
import { DateTime } from 'luxon'

export async function getServerSideProps() {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(['classes'], fetchClasses)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
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
}))

interface TableScrollAreaProps {
	data: {
		id: string
		status: any
		classNum: number
		description: string
		materialLinks: string[]
		date: string
		tags: any
	}[]
}

export function TableScrollArea({ data }: TableScrollAreaProps) {
	const { classes, cx } = useStyles()
	const [scrolled, setScrolled] = useState(false)
	const [selectedRow, setSelectedRow] = useState('')

	const rows = data.map((row) => {
		const formattedDate = DateTime.fromISO(row.date).toFormat('DDDD')
		return (
			<tr
				key={row.id}
				onClick={() => setSelectedRow(row.id)}
				className={row.id === selectedRow ? classes.active : classes.tablerow}
			>
				<td>{row.status}</td>
				{/* This will return a react component for the Status */}
				<td>{row.classNum}</td>
				<td>{row.description}</td>
				<td>{row.materialLinks}</td>
				{/* may need to map again - this returns an array */}
				<td>{formattedDate}</td>
				<td>{row.tags[0].tag}</td>
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
		</ScrollArea>
	)
}

const ClassTable = () => {
	const { data, isLoading, isError, error } = useQuery(
		['classes'],
		fetchClasses
	)

	if (isLoading) return <Text>Loading...</Text>
	if (isError) return <Text>{`Error: ${error}`}</Text>
	return <TableScrollArea data={data} />
}

export default ClassTable
