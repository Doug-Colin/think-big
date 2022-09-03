import { useState } from 'react'
import { Calendar } from '@mantine/dates'

function MiniCalendar() {
	const [month, onMonthChange] = useState(new Date())

	return <Calendar month={month} onMonthChange={onMonthChange} />
}
