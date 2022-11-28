import { Box } from '@chakra-ui/react'
import { Bump, ResponsiveBump } from '@nivo/bump'
import { Line, ResponsiveLine } from '@nivo/line'
import React from 'react'
import { Delta } from '../../utils/types'

interface TimeSeriesPlotProps {
	data: any[]
	delta: Delta | undefined
	range: '5d' | '10d' | '1m' | '3m' | '1y' | 'all'
	showAxes: boolean
}

const TimeSeriesPlot: React.FC<TimeSeriesPlotProps> = ({
	data,
	delta,
	range,
	showAxes,
}) => {
	return (
		<Box h={'360px'}>
			<ResponsiveBump
				data={data}
				xPadding={0.6}
				colors={[delta && delta.valueChange < 0 ? '#dc2626' : '#16a34a']}
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
				// width={640}
				// height={400}
				tooltip={() => <>{data[0].id}</>}
			/>
		</Box>
	)
}

export default TimeSeriesPlot
