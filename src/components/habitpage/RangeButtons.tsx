import { Box, Button } from '@chakra-ui/react'
import { BumpDatum } from '@nivo/bump'
import React, { Dispatch, SetStateAction } from 'react'
import { RANGE, Range } from '../../utils/range'

interface RangeButtonsProps {
	range: Range
	setRange: Dispatch<SetStateAction<Range>>
	showAxes: boolean
	setShowAxes: Dispatch<SetStateAction<boolean>>
}

const RangeButtons: React.FC<RangeButtonsProps> = ({
	range,
	setRange,
	showAxes,
	setShowAxes,
}) => {
	return (
		<Box className='flex w-full'>
			<Button
				onClick={() => setRange('RANGE_7D')}
				variant={range === 'RANGE_7D' ? 'solid' : 'ghost'}
				colorScheme={range === 'RANGE_7D' ? 'messenger' : 'gray'}
				className={range === 'RANGE_7D' ? 'shadow-md' : ''}
			>
				{RANGE.RANGE_7D.label}
			</Button>
			<Button
				onClick={() => setRange('RANGE_14D')}
				variant={range === 'RANGE_14D' ? 'solid' : 'ghost'}
				colorScheme={range === 'RANGE_14D' ? 'messenger' : 'gray'}
				className={range === 'RANGE_14D' ? 'shadow-md' : ''}
			>
				{RANGE.RANGE_14D.label}
			</Button>
			<Button
				onClick={() => setRange('RANGE_1M')}
				variant={range === 'RANGE_1M' ? 'solid' : 'ghost'}
				colorScheme={range === 'RANGE_1M' ? 'messenger' : 'gray'}
				className={range === 'RANGE_1M' ? 'shadow-md' : ''}
			>
				{RANGE.RANGE_1M.label}
			</Button>
			<Button
				onClick={() => setRange('RANGE_3M')}
				variant={range === 'RANGE_3M' ? 'solid' : 'ghost'}
				colorScheme={range === 'RANGE_3M' ? 'messenger' : 'gray'}
				className={range === 'RANGE_3M' ? 'shadow-md' : ''}
			>
				{RANGE.RANGE_3M.label}
			</Button>
			<Button
				onClick={() => setRange('RANGE_1Y')}
				variant={range === 'RANGE_1Y' ? 'solid' : 'ghost'}
				colorScheme={range === 'RANGE_1Y' ? 'messenger' : 'gray'}
				className={range === 'RANGE_1Y' ? 'shadow-md' : ''}
			>
				{RANGE.RANGE_1Y.label}
			</Button>
			<Button
				onClick={() => setRange('RANGE_ALL')}
				variant={range === 'RANGE_ALL' ? 'solid' : 'ghost'}
				colorScheme={range === 'RANGE_ALL' ? 'messenger' : 'gray'}
				className={range === 'RANGE_ALL' ? 'shadow-md' : ''}
			>
				{RANGE.RANGE_ALL.label}
			</Button>
			<Button
				onClick={() => {
					setShowAxes((s) => !s)
					console.log(range)
				}}
				colorScheme={showAxes ? 'messenger' : 'gray'}
				variant='ghost'
				className='invisible ml-auto flex md:visible'
			>
				{showAxes ? 'Hide' : 'Show'} Axis
			</Button>
		</Box>
	)
}

export default RangeButtons
