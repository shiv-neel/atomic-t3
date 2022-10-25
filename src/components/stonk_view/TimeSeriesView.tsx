import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Habit, HabitHistory } from '../../models/Habit'
import { BumpDatum } from '@nivo/bump'
import TimeSeriesPlot from './TimeSeriesPlot'
import RangeButtons from './RangeButtons'

interface TimeSeriesViewProps {
	hid?: string
	submitted?: boolean
}
const TimeSeriesView: React.FC<TimeSeriesViewProps> = ({ hid, submitted }) => {
	const [habit, setHabit] = useState<Habit>()
	const [habitHistory, setHabitHistory] = useState<BumpDatum[]>([])
	const [range, setRange] = useState<'5d' | '10d' | '1m' | '3m' | '1y' | 'all'>(
		'5d'
	)
	const [showAxes, setShowAxes] = useState<boolean>(false)
	const [stonk, setStonk] = useState<number>(0)

	useEffect(() => {
		const getHabitHistory = async () => {
			const data: HabitHistory[] = []

			const dates = data!.map((d) => new Date(d.date!).getTime())
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
		getHabitHistory()
	}, [hid, submitted])

	useEffect(() => {}, [hid, habitHistory])

	const data = [
		{
			id: habit ? habit.hname : '',
			data: habitHistory.slice(-RANGE[range].maxRange),
		},
	]

	useEffect(() => {
		const getStonkLocal = async () => {
			if (!hid) return
			const todaysStonk = await getTodaysStonk(hid!)
			setStonk(todaysStonk)
		}
		getStonkLocal()
	}, [hid, habitHistory])

	return (
		<Box>
			<Box className='h-1/2'>
				<p className='text-3xl font-bold mb-2'>
					{habit! && habit!.hname ? habit!.hname : ''}
				</p>
				<p className='text-3xl font-bold mb-4'>${stonk.toFixed(2)}</p>
				{data[0].data.length > 0 && (
					<TimeSeriesPlot
						data={data}
						range={range}
						showAxes={showAxes}
						submitted={submitted || false}
					/>
				)}
				<RangeButtons
					range={range}
					setRange={setRange}
					showAxes={showAxes}
					setShowAxes={setShowAxes}
					habitHistory={habitHistory}
				/>
			</Box>
		</Box>
	)
}

export default TimeSeriesView
