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
	service: 'Twitch' | 'YouTube'
	url: string
}
declare interface ClassRecord {
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
