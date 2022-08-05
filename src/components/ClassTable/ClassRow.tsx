import { MouseEventHandler } from 'react'
import { TagGroup } from '~/components'
import { ClassStatusIcon } from './'
import { DateTime } from 'luxon'
import { Center } from '@mantine/core'
import { FetchClassesResult, FetchClassStatusesResult } from '~/hooks'

interface ClassRowProps {
	data: FetchClassesResult[0]
	classStatus: FetchClassStatusesResult['classes'][0]['status']
	userId: string
	key: string
	clickHandler: MouseEventHandler<any>
	className: string
}

export const ClassRow = ({
	data,
	userId,
	classStatus,
	clickHandler,
	className,
}: ClassRowProps) => {
	const formattedDate = DateTime.fromISO(data.date.toString()).toFormat('DDDD')
	return (
		<tr onClick={clickHandler} className={className}>
			<td>
				<Center>
					<ClassStatusIcon status={classStatus} />
				</Center>
			</td>
			<td>{data.classNum}</td>
			<td>{data.title}</td>
			<td>{data.materialLinks[0]?.url}</td>
			{/* may need to map again - this returns an array */}
			<td>{formattedDate}</td>
			<td>
				<TagGroup tags={data.tags} />
			</td>
		</tr>
	)
}
