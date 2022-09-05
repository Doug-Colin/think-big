import { useState } from 'react'
import { createStyles } from '@mantine/core'
import { Calendar } from '@mantine/dates'

const useStyles = createStyles((theme) => ({
	calendarBase: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[4]
				: theme.colors.primary[6],
		borderRadius: theme.radius.md,
	},

	// calendarHeader: {
	// 	backgroundColor:
	// 		theme.colorScheme === 'dark'
	// 			? theme.colors.dark[4]
	// 			: theme.colors.primary[6],
	// },

	// calendarHeaderControl: {
	// 	color:
	// 		theme.colorScheme === 'dark'
	// 			? theme.colors.dark[4]
	// 			: theme.colors.primary[1],
	// },

	// calendarHeaderLevel: {},

	// calendarHeaderLevelIcon: {},

	// yearPicker: {},

	// yearPickerControls: {},

	// yearPickerControl: {},

	// yearPickerControlActive: {},

	// monthPicker: {
	// 	color:
	// 		theme.colorScheme === 'dark'
	// 			? theme.colors.dark[4]
	// 			: theme.colors.primary[4],
	// },

	// monthPickerControls: {},

	// monthPickerControl: {},

	// monthPickerControlActive: {},

	month: {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[4]
				: theme.colors.primary[4],
	},

	weekdayCell: {},

	weekday: {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[4]
				: theme.colors.primary[4],
	},

	cell: {},

	day: {},
}))

export const MiniCalendar = () => {
	const { classes } = useStyles()
	const [month, onMonthChange] = useState(new Date())

	return (
		<Calendar
			month={month}
			onMonthChange={onMonthChange}
			allowLevelChange={false}
			initialMonth={new Date()}
			// disableOutsideEvents
			// excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}

			classNames={{
				calendarBase: classes.calendarBase,
				// calendarHeader: classes.calendarHeader,
				// calendarHeaderControl: classes.calendarHeaderControl,
				// monthPicker: classes.monthPicker,
				// monthPickerControls: classes.monthPickerControls,
				// monthPickerControl: classes.monthPickerControl,
				// monthPickerControlActive: classes.monthPickerControlActive,
				// month: classes.month,
				weekdayCell: classes.weekdayCell,
				weekday: classes.weekday,
				cell: classes.cell,
				day: classes.day,
			}}
		/>
	)
}

export default MiniCalendar
