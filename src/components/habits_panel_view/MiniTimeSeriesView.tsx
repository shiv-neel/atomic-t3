import { Box } from '@chakra-ui/react'
import { BumpDatum } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { Habit, HabitHistory } from '../../models/Habit'
import { getAllHabitHistory, getHabitFromId } from '../../utils/habit_resolver'
import { supabase } from '../../utils/supabase'
import MiniTimeSeriesPlot from '../stonk_view/MiniTimeSeriesPlot'
import TimeSeriesPlot from '../stonk_view/TimeSeriesPlot'

interface MiniTimeSeriesViewProps {
	hid?: string
}

const MiniTimeSeriesView: React.FC<MiniTimeSeriesViewProps> = ({ hid }) => {
	const [habitHistory, setHabitHistory] = useState<BumpDatum[]>([])
	const [hname, setHname] = useState<string>('')

	useEffect(() => {
		const getHabitHistory = async () => {
			const data: HabitHistory[] = await getAllHabitHistory(hid!)

			const dates = data.map((d) => new Date(d.date!).getTime())
			const stonks = data.map((d) => d.stonk!)
			const series: BumpDatum[] = []
			for (let i = 0; i < dates.length; i++) {
				const datum: BumpDatum = {
					x: dates[i],
					y: stonks[i] * -1, // bc plot renders upside down for some reason
				}
				series.push(datum)
			}
			setHabitHistory(series)
		}

		const getHname = async () => {
			const habit: Habit | null = await getHabitFromId(hid!)
			if (!habit) return
			setHname(habit.hname)
		}

		getHabitHistory()
		getHname()
	}, [hid])

	const data = [
		{
			id: hname,
			data: habitHistory,
		},
	]

	return (
		<Box>
			{data[0].data.length ? (
				<MiniTimeSeriesPlot data={data} />
			) : (
				<p className='flex justify-center font-light'>No data yet</p>
			)}
		</Box>
	)
}

export default MiniTimeSeriesView
