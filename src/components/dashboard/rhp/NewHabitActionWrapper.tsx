import Link from 'next/link'
import React from 'react'
import { Temporality } from '../../../utils/temporality'

interface Props {
	children: React.ReactNode
	temporality: Temporality
}

const NewHabitActionWrapper: React.FC<Props> = ({ children, temporality }) => {
	return (
		<Link href={`/new_habit_form?temporality=${temporality}`}>{children}</Link>
	)
}

export default NewHabitActionWrapper
