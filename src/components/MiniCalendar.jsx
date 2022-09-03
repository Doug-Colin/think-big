import { useState } from 'react'
import { Calendar } from '@mantine/dates'

export const MiniCalendar = () => {
	const [month, onMonthChange] = useState(new Date())

	return <Calendar month={month} onMonthChange={onMonthChange} />
}

export default MiniCalendar
