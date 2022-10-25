import { Box, Button, Text } from '@chakra-ui/react'
import { BumpDatum, ResponsiveBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'

export interface TimeSeriesPlotProps {
	data: {
		id: string
		data: BumpDatum[]
	}[]
	range: '5d' | '10d' | '1m' | '3m' | '1y' | 'all'
	showAxes: boolean
	submitted?: boolean
}

const TimeSeriesPlot: React.FC<TimeSeriesPlotProps> = ({
	data,
	range,
	showAxes,
	submitted,
}) => {
	const [trimmedSeries, setTrimmedSeries] = useState<any>(data)
	const [delta, setDelta] = useState<number>(0)

	useEffect(() => {
		if (!data) return
		if (trimmedSeries[0].data.length > RANGE[range].maxRange) {
			// if we have more history than the range, trim it
			const start = trimmedSeries[0].data.length - RANGE[range].maxRange
			const series = [
				{ id: trimmedSeries[0].id, data: trimmedSeries[0].data.slice(start) },
			]
			setTrimmedSeries(series)
		} else {
			setTrimmedSeries(data)
		}
	}, [data, range, submitted])

	useEffect(() => {
		setDelta(
			Math.abs(trimmedSeries[0].data[trimmedSeries[0].data.length - 1].y) -
				Math.abs(trimmedSeries[0].data[0].y)
		)
	}, [trimmedSeries, range])

	return (
		<Box h={'sm'}>
			<Box className='flex items-center gap-1'>
				<Box>
					{delta < 0 ? (
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
						delta < 0 ? 'red' : 'green'
					}-600 flex items-center`}
				>
					<p className='font-bold mr-2'>${delta.toFixed(2)}</p>
					{'	'}(
					{((delta / Math.abs(trimmedSeries[0].data[0].y)) * 100).toFixed(2)}%)
				</Box>
				<p className='ml-2'>{RANGE[range].string}</p>
			</Box>
			<ResponsiveBump
				data={trimmedSeries}
				xPadding={0.6}
				colors={[delta < 0 ? '#dc2626' : '#16a34a']}
				lineWidth={3}
				activeLineWidth={6}
				inactiveLineWidth={3}
				inactiveOpacity={0.15}
				pointSize={10}
				activePointSize={16}
				inactivePointSize={0}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={3}
				activePointBorderWidth={3}
				pointBorderColor={{ from: 'serie.color' }}
				axisTop={null}
				axisBottom={null}
				axisLeft={
					showAxes
						? {
								format: (value) => (value * -1).toFixed(2),
								legendPosition: 'middle',
								legendOffset: -60,
						  }
						: null
				}
				margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
				axisRight={null}
				enableGridX={false}
				enableGridY={false}
				endLabel={false}
				tooltip={() => <>{data[0].id}</>}
			/>
		</Box>
	)
}

export default TimeSeriesPlot
