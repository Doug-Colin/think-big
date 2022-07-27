import { Badge, Group } from '@mantine/core'

// TypeScript specific
interface TagGroupProps {
	tags: {
		name: string
		color: string
	}[]
	noWrap: boolean
}

export const TagGroup = ({ tags, noWrap = true }: TagGroupProps) => {
	const tagItems = tags.map((tag) => {
		return (
			<Badge
				key={tag.name}
				size='sm'
				styles={(theme) => ({
					root: {
						backgroundColor: tag.color,
					},
				})}
			>
				{tag.name}
			</Badge>
		)
	})

	return (
		<Group spacing={5} noWrap={noWrap}>
			{tagItems}
		</Group>
	)
}
