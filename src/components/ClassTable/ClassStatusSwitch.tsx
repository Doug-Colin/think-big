import { SegmentedControl, Tooltip, Loader } from '@mantine/core'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { updateClassStatusAPI, keyClassStatuses } from '~/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
	const queryClient = useQueryClient()
	const update = useMutation(
		(value: ClassStatusSwitchProps['status']) =>
			updateClassStatusAPI(userId, classId, value),
		{ onSuccess: () => queryClient.invalidateQueries(keyClassStatuses(userId)) }
	)
	const handleClick = (value: ClassStatusSwitchProps['status']) => {
		setClassStatus(value)
		update.mutate(value)
	}
	const showLoader = (value) =>
		update.isLoading && value === classStatus ? <Loader size='sm' /> : false
	return (
		<SegmentedControl
			data={[
				{
					label: (
						<Tooltip label='Not started' withArrow withinPortal>
							{showLoader('not_started') ? (
								showLoader('not_started')
							) : (
								<Icon icon='fa6-solid:minus' />
							)}
						</Tooltip>
					),
					value: 'not_started',
				},
				{
					label: (
						<Tooltip label='In progress' withArrow withinPortal>
							{showLoader('in_progress') ? (
								showLoader('in_progress')
							) : (
								<Icon icon='fa6-solid:laptop-code' />
							)}
						</Tooltip>
					),
					value: 'in_progress',
				},
				{
					label: (
						<Tooltip label='Done' withArrow withinPortal>
							{showLoader('done') ? (
								showLoader('done')
							) : (
								<Icon icon='fa6-solid:flag-checkered' />
							)}
						</Tooltip>
					),
					value: 'done',
				},
			]}
			value={classStatus}
			onChange={(value: ClassStatusSwitchProps['status']) => {
				handleClick(value)
			}}
			size='sm'
			disabled={update?.isLoading}
		/>
	)
}
