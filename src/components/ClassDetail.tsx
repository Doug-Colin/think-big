import { useState } from 'react'
import {
	Modal,
	Divider,
	Group,
	Stack,
	Text,
	Anchor,
	createStyles,
	Space,
	Title,
} from '@mantine/core'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { TagGroup } from './'

interface MaterialLink {
	url: string
	type: string
}
interface Tags {
	id: string
	tag: string
	color: string
	active: boolean
}
interface CheckinTweet {
	id: string
	url: string
}
interface VodLink {
	id?: string
	classId?: string
	service: 'Twitch' | 'YouTube' | string
	url: string
}
interface ClassDetailProps {
	classData: {
		id: string
		status?: any
		title: string
		classNum: number
		description: string
		materialLinks: MaterialLink[]
		date: string | Date
		tags: Tags[]
		checkinTweet?: CheckinTweet
		slidesUrl?: string
		vod?: VodLink[]
	}
	// non data props
	open: boolean
}

const useStyles = createStyles((theme) => ({
	modal: {
		height: '60vh',
	},
	fullWidth: {
		width: '100%',
	},
	fullHeight: {
		height: '100%',
	},
	modalClose: {
		color: theme.colors.secondary[4],
	},
	YouTube: {
		color: '#ff0000',
	},
	Twitch: {
		color: '#9146ff',
	},
	stackCenter: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	maxHalf: {
		maxWidth: '50%',
	},
}))

const ClassDetail = ({ classData, open }: ClassDetailProps) => {
	const [opened, setOpened] = useState(false)
	const { classes, cx } = useStyles()
	open ? setOpened(true) : null
	return (
		<Modal
			opened={opened}
			onClose={() => setOpened(false)}
			title={
				<Title order={1}>
					{`Class ${classData.classNum} - ${classData.title}`}
				</Title>
			}
			centered
			size='60vw'
			classNames={{
				modal: classes.modal,
				body: classes.fullHeight,
				close: classes.modalClose,
			}}
			transition='skew-down'
			transitionDuration={400}
		>
			<Divider my='xs' />
			<Space h='md' />
			<TagGroup
				tags={classData.tags}
				className={classes.fullWidth}
				tagSize='lg'
			/>
			<Space h='xl' />
			<Group align='flex-start' spacing='xl'>
				<Stack className={classes.maxHalf}>
					<Text weight={700}>Message:</Text>
					<Text>{classData.description}</Text>
				</Stack>
				<Stack className={cx(classes.stackCenter, classes.maxHalf)}>
					<Group>
						<Text inline weight={700}>
							Check-in:
						</Text>
						{classData.checkinTweet ? (
							<Text inline>
								<Link href={classData.checkinTweet.url} passHref>
									<Anchor target='_blank'>Click here</Anchor>
								</Link>
							</Text>
						) : (
							<Text inline>No Checkin required</Text>
						)}
					</Group>
					<Group>
						<Text inline weight={700}>
							VOD:
						</Text>
						{classData.vod ? (
							classData.vod.map((link) => (
								<Text inline key={link.url}>
									<Link href={link.url} passHref>
										<Anchor target='_blank'>
											<Icon
												icon={`fa6-brands:${link.service.toLowerCase()}`}
												className={classes[link.service]}
											/>{' '}
											{link.service}
										</Anchor>
									</Link>
								</Text>
							))
						) : (
							<Text inline>No video for this class</Text>
						)}
					</Group>
					<Group>
						<Text inline weight={700}>
							Slides:
						</Text>
						{classData.slidesUrl ? (
							<Text inline>
								<Link href={classData.slidesUrl} passHref>
									<Anchor target='_blank'>Click here</Anchor>
								</Link>
							</Text>
						) : (
							<Text inline>No slides for this class</Text>
						)}
					</Group>
				</Stack>
			</Group>
		</Modal>
	)
}

export { ClassDetail }
