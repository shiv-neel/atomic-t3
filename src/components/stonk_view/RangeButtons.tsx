import { Box, Button } from '@chakra-ui/react'
import { BumpDatum } from '@nivo/bump'
import React, { Dispatch, SetStateAction } from 'react'
import { RANGE } from '../../utils/calculations'

interface RangeButtonsProps {
	range: '5d' | '10d' | '1m' | '3m' | '1y' | 'all'
	setRange: Dispatch<SetStateAction<'5d' | '10d' | '1m' | '3m' | '1y' | 'all'>>
	habitHistory: BumpDatum[]
	showAxes: boolean
	setShowAxes: Dispatch<SetStateAction<boolean>>
}

const RangeButtons: React.FC<RangeButtonsProps> = ({
	range,
	setRange,
	habitHistory,
	showAxes,
	setShowAxes,
}) => {
	return (
		<Box className='flex justify-start'>
			<Button
				onClick={() => setRange('5d')}
				disabled={!(habitHistory.length >= RANGE['5d'].minRange)}
				variant={range === '5d' ? 'solid' : 'ghost'}
				colorScheme={range === '5d' ? 'messenger' : 'gray'}
				className={range === '5d' ? 'shadow-md' : ''}
			>
				5D
			</Button>
			<Button
				onClick={() => setRange('10d')}
				disabled={!(habitHistory.length >= RANGE['10d'].minRange)}
				variant={range === '10d' ? 'solid' : 'ghost'}
				colorScheme={range === '10d' ? 'messenger' : 'gray'}
				className={range === '10d' ? 'shadow-md' : ''}
			>
				10D
			</Button>
			<Button
				onClick={() => setRange('1m')}
				disabled={!(habitHistory.length >= RANGE['1m'].minRange)}
				variant={range === '1m' ? 'solid' : 'ghost'}
				colorScheme={range === '1m' ? 'messenger' : 'gray'}
				className={range === '1m' ? 'shadow-md' : ''}
			>
				1M
			</Button>
			<Button
				onClick={() => setRange('3m')}
				disabled={!(habitHistory.length >= RANGE['3m'].minRange)}
				variant={range === '3m' ? 'solid' : 'ghost'}
				colorScheme={range === '3m' ? 'messenger' : 'gray'}
				className={range === '3m' ? 'shadow-md' : ''}
			>
				3M
			</Button>
			<Button
				onClick={() => setRange('1y')}
				disabled={!(habitHistory.length >= RANGE['1y'].minRange)}
				variant={range === '1y' ? 'solid' : 'ghost'}
				colorScheme={range === '1y' ? 'messenger' : 'gray'}
				className={range === '1y' ? 'shadow-md' : ''}
			>
				1Y
			</Button>
			<Button
				onClick={() => setRange('all')}
				variant={range === 'all' ? 'solid' : 'ghost'}
				colorScheme={range === 'all' ? 'messenger' : 'gray'}
				className={range === 'all' ? 'shadow-md' : ''}
			>
				ALL
			</Button>
			<Button
				onClick={() => {
					setShowAxes((s) => !s)
					console.log(range)
				}}
				colorScheme={showAxes ? 'messenger' : 'gray'}
				variant='ghost'
				className='ml-auto'
			>
				{showAxes ? 'Hide' : 'Show'} Axis
			</Button>
		</Box>
	)
}

export default RangeButtons
