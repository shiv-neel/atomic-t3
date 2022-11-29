import { Box } from '@chakra-ui/react'
import { Bump } from '@nivo/bump'
import { trpc } from '../../../utils/trpc'
import { Delta } from '../../../utils/types'

interface Props {
	hid: string
}

const TimeSeriesPreview: React.FC<Props> = ({ hid }) => {
	const data: any = trpc.data.getDataObjectOverRange.useQuery({
		hid,
		range: 5,
	}).data!

	const delta: Delta = trpc.data.getDeltaOverRange.useQuery({ hid, range: 1 })
		.data!

	return (
		<Box>
			<Box h={'100px'} className='flex justify-center'>
				{data && (
					<Bump
						data={data}
						xPadding={0.6}
						colors={[delta.percentChange > 0 ? '#dc2626' : '#16a34a']}
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
				)}
			</Box>
		</Box>
	)
}

export default TimeSeriesPreview
