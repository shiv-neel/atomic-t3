import { Range } from './types'

export const RANGE = {
    '5d': {
        minRange: 0,
        maxRange: 5,
        string: 'Past week',
    },
    '10d': {
        minRange: 5,
        maxRange: 10,
        string: 'Past week',
    },
    '1m': {
        minRange: 10,
        maxRange: 30,
        string: 'Past month',
    },
    '3m': {
        minRange: 30,
        maxRange: 90,
        string: 'Past 3 months',
    },
    '1y': {
        minRange: 90,
        maxRange: 365,
        string: 'Past year',
    },
    all: {
        minRange: 0,
        maxRange: 365,
        string: 'All time',
    },
}