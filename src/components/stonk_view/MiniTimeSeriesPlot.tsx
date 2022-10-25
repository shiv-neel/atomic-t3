import { Box } from '@chakra-ui/react'
import { Bump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { RANGE } from '../../utils/calculations'
import { TimeSeriesPlotProps } from './TimeSeriesPlot'

interface MiniTimeSeriesPlotProps {
	data: TimeSeriesPlotProps['data']
}

const MiniTimeSeriesPlot: React.FC<MiniTimeSeriesPlotProps> = ({ data }) => {
	const [trimmedSeries, setTrimmedSeries] = useState<any>(data)
	const [delta, setDelta] = useState<number>(0)

	useEffect(() => {
		if (!data) return
		if (trimmedSeries[0].data.length > RANGE['5d'].maxRange) {
			// if we have more history than the range, trim it
			const start = trimmedSeries[0].data.length - RANGE['5d'].maxRange
			const series = [
				{ id: trimmedSeries[0].id, data: trimmedSeries[0].data.slice(start) },
			]
			setTrimmedSeries(series)
		} else {
			setTrimmedSeries(data)
		}
	}, [])

	useEffect(() => {
		setDelta(
			Math.abs(trimmedSeries[0].data[trimmedSeries[0].data.length - 1].y) -
				Math.abs(trimmedSeries[0].data[0].y)
		)
	}, [trimmedSeries])

	return (
		<Box>
			<Box h={'100px'} className='flex justify-center'>
				<Bump
					data={trimmedSeries}
					xPadding={0.6}
					colors={[delta < 0 ? '#dc2626' : '#16a34a']}
					lineWidth={2}
					activeLineWidth={4}
					inactiveLineWidth={2}
					inactiveOpacity={0.15}
					pointSize={6}
					activePointSize={10}
					inactivePointSize={0}
					pointColor={{ theme: 'background' }}
					pointBorderWidth={3}
					activePointBorderWidth={3}
					pointBorderColor={{ from: 'serie.color' }}
					axisTop={null}
					axisBottom={null}
					axisLeft={null}
					axisRight={null}
					enableGridX={false}
					enableGridY={false}
					endLabel={false}
					width={250}
					height={100}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					tooltip={() => <></>}
				/>
			</Box>
		</Box>
	)
}

export default MiniTimeSeriesPlot
