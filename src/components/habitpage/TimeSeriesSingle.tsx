import { Box } from '@chakra-ui/react'
import { BumpDatum } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { RANGE, Range } from '../../utils/range'
import { trpc } from '../../utils/trpc'
import { Delta, HidProps } from '../../utils/types'
import RangeButtons from './RangeButtons'
import TimeSeriesPlot from './TimeSeriesPlot'

const TimeSeriesSingle: React.FC<HidProps> = ({ hid }) => {
	const [hname, setHname] = useState('')
	const [data, setData] = useState<any[]>([])
	const [delta, setDelta] = useState<Delta>()
	const [stock, setStock] = useState<number>(10)
	const [range, setRange] = useState<Range>('RANGE_7D')
	const [showAxes, setShowAxes] = useState<boolean>(false)

	const _data: any = trpc.data.getDataObjectOverRange.useQuery({
		hid,
		range: RANGE[range].range,
	}).data!

	const _delta = trpc.data.getDeltaOverRange.useQuery({
		hid,
		range: RANGE[range].range,
	}).data!

	const _stock: number = trpc.data.getCurrentStockValue.useQuery({ hid }).data
		?.stock

	const _hname = trpc.habit.getHabitByHid.useQuery({ hid }).data?.name!

	useEffect(() => {
		if (!_data || !_delta) return
		setData(_data)
		setDelta(_delta)
		setStock(_stock)
		setHname(_hname)
	}, [_data, _delta])

	useEffect(() => {}, [])

	return (
		<Box className='flex flex-col'>
			<Box className='mb-3 text-3xl font-bold'>{_hname}</Box>
			<Box className='mb-3 text-3xl font-bold'>${_stock.toFixed(2)}</Box>
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

export default TimeSeriesSingle
