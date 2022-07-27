import { Badge, Group } from '@mantine/core'

// TypeScript specific
interface TagGroupProps {
	tags: {
		tag: string
		color: string
	}[]
	noWrap?: boolean
}

export const TagGroup = ({ tags, noWrap = true }: TagGroupProps) => {
	const tagItems = tags.map((tag) => {
		return (
			<Badge
				key={tag.tag}
				size='sm'
				styles={(theme) => ({
					root: {
						backgroundColor: tag.color,
					},
				})}
			>
				{tag.tag}
			</Badge>
		)
	})

	return (
		<Group spacing={5} noWrap={noWrap}>
			{tagItems}
		</Group>
	)
}
