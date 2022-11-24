import { Box } from '@chakra-ui/react'
import { BumpDatum } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { RANGE } from '../../utils/constants'
import { trpc } from '../../utils/trpc'
import TimeSeriesPlot from './TimeSeriesPlot'

export interface TimeSeriesPlotProps {
	hid: string
	range: '5d' | '10d' | '1m' | '3m' | '1y' | 'all'
}

const TimeSeriesMain: React.FC<TimeSeriesPlotProps> = ({ hid, range }) => {
	const [data, setData] = useState<any[]>([])
	const [delta, setDelta] = useState<any>()
	const [showAxes, setShowAxes] = useState<boolean>(false)
	const [submitted, setSubmitted] = useState<boolean>(false)

	const _data: any = trpc.data.getDataObjectOverRange.useQuery({
		hid,
		range: 5,
	}).data!

	const _delta = trpc.data.getDeltaOverRange.useQuery({
		hid,
		range: 1,
	}).data!

	useEffect(() => {
		if (!_data || !_delta) return
		setData(_data)
		setDelta(_delta)
	}, [_data, _delta])

	return (
		<Box h={'sm'}>
			<Box className='flex items-center gap-1'>
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
				<TimeSeriesPlot
					delta={delta}
					data={data}
					range={range}
					showAxes={showAxes}
					submitted={submitted}
				/>
			</Box>
		</Box>
	)
}

export default TimeSeriesMain
