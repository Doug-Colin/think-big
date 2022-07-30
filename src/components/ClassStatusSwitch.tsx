import { SegmentedControl } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useState } from 'react'

interface ClassStatusSwitchProps {
	classId: string
	status: 'not_started' | 'in_progress' | 'done'
	userId: string
}

export const ClassStatusSwitch = ({
	classId,
	status,
	userId,
}: ClassStatusSwitchProps) => {
	const [classStatus, setClassStatus] = useState(status)
	const handleClick = (value) => {
		setClassStatus(value)
	}

	return (
		<SegmentedControl
			data={[
				{
					label: <Icon icon='fa6-solid:minus' className='noPop' />,
					value: 'not_started',
				},
				{
					label: <Icon icon='fa6-solid:laptop-code' className='noPop' />,
					value: 'in_progress',
				},
				{
					label: <Icon icon='fa6-solid:flag-checkered' className='noPop' />,
					value: 'done',
				},
			]}
			value={classStatus}
			onChange={function (value) {
				handleClick(value)
			}}
			size='sm'
			classNames={{
				root: 'noPop',
				labelActive: 'noPop',
				label: 'noPop',
				input: 'noPop',
				control: 'noPop',
			}}
			// color='black'
		/>
	)
}
