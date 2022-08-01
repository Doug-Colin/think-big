import { MouseEventHandler } from 'react'
import { ClassStatusSwitch, TagGroup } from '~/components'
import { DateTime } from 'luxon'

interface ClassRowProps {
	data: ClassRecord
	classStatus: UserClassStatus['status']
	userId: string
	key: string
	clickHandler: MouseEventHandler<any>
	className: string
}

export const ClassRow = ({
	data,
	userId,
	classStatus,
	key,
	clickHandler,
	className,
}: ClassRowProps) => {
	const formattedDate = DateTime.fromISO(data.date.toString()).toFormat('DDDD')
	return (
		<tr key={key} onClick={clickHandler} className={className}>
			<td>
				<ClassStatusSwitch
					classId={data.id}
					userId={userId}
					status={classStatus}
				/>
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
