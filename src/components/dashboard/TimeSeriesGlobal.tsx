import { Box } from '@chakra-ui/react'
import { BumpDatum } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { RANGE, Range } from '../../utils/range'
import { trpc } from '../../utils/trpc'
import { Delta, HabitDatumProps, HidProps } from '../../utils/types'
import RangeButtons from '../habitpage/RangeButtons'
import TimeSeriesPlot from '../habitpage/TimeSeriesPlot'
import { RANGE_7D } from '../../utils/range'
import { Habit } from '@prisma/client'

const TimeSeriesGlobal: React.FC<HidProps> = ({ hid }) => {
	const [hname, setHname] = useState('')
	const [data, setData] = useState<any[]>([])
	const [delta, setDelta] = useState<Delta>()
	const [range, setRange] = useState<Range>(RANGE_7D)
	const [showAxes, setShowAxes] = useState<boolean>(false)

	const _data: HabitDatumProps[] = trpc.data.getDataObjectOverRange.useQuery({
		hid,
		range: RANGE[range].range,
	}).data!

	const _delta: Delta = trpc.data.getDeltaOverRange.useQuery({
		hid,
		range: RANGE[range].range,
	}).data!

	const _habit: Habit = trpc.habit.getHabitByHid.useQuery({ hid }).data!

	useEffect(() => {
		if (!_data || !_delta || !_habit) return
		setData(_data)
		setDelta(_delta)
		setHname(_habit.name)
	}, [_data, _delta, _habit])

	return (
		<Box className='flex flex-col'>
			<Box className='mb-3 text-3xl font-bold'>{hname}</Box>
			<Box className='mb-3 flex items-center gap-1'>
				<Box>
					{delta && delta.valueChange && delta.valueChange < 0 ? (
						<BsFillCaretDownFill className='text-red-600' />
					) : (
						<BsFillCaretUpFill
							className='
                text-green-600'
						/>
					)}
				</Box>
				<Box
					className={`text-${
						delta && delta.valueChange && delta.valueChange < 0
							? 'red'
							: 'green'
					}-600 flex items-center`}
				>
					<p className='mr-2 font-bold'>
						${delta && delta.valueChange && delta.valueChange.toFixed(2)}
					</p>
					<p>
						{delta && delta.valueChange ? delta.percentChange.toFixed(2) : 0}%
					</p>
				</Box>
				<p className='ml-2'>{RANGE[range].string}</p>
			</Box>
			<TimeSeriesPlot delta={delta} data={data} showAxes={showAxes} />
			<RangeButtons
				range={range}
				setRange={setRange}
				showAxes={showAxes}
				setShowAxes={setShowAxes}
			/>
		</Box>
	)
}

export default TimeSeriesGlobal
