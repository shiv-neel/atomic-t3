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
	const [showAxes, setShowAxes] = useState<boolean>(false)
	const [submitted, setSubmitted] = useState<boolean>(false)

	const data: any = trpc.data.getDataObjectOverRange.useQuery({
		hid,
		range: 5,
	}).data!

	const delta = trpc.data.getPercentChangeOverRange.useQuery({
		hid,
		range: 1,
	}).data!

	useEffect(() => {
		if (!delta) return
	}, [delta])

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
						delta.valueChange < 0 ? 'red' : 'green'
					}-600 flex items-center`}
				>
					<p className='mr-2 font-bold'>${delta.valueChange.toFixed(2)}</p>
					<p>{delta.percentChange.toFixed(2)}%</p>
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
