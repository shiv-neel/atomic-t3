export type Range = 'RANGE_7D' | 'RANGE_14D' | 'RANGE_1M' | 'RANGE_3M' | 'RANGE_1Y' | 'RANGE_ALL'

export const RANGE_7D: Range = 'RANGE_7D'
export const RANGE_14D: Range = 'RANGE_14D'
export const RANGE_1M: Range = 'RANGE_1M'
export const RANGE_3M: Range = 'RANGE_3M'
export const RANGE_1Y: Range = 'RANGE_1Y'
export const RANGE_ALL: Range = 'RANGE_ALL'

export const RANGE = {
    RANGE_7D: {
        range: 7,
        label: '7D',
        string: 'Past week',
    },
    RANGE_14D: {
        range: 14,
        label: '14D',
        string: 'Past 2 weeks',
    },
    RANGE_1M: {
        range: 30,
        label: '1M',
        string: 'Past month',
    },
    RANGE_3M: {
        range: 90,
        label: '3M',
        string: 'Past 3 months',
    },
    RANGE_1Y: {
        range: 365,
        label: '1Y',
        string: 'Past year',
    },
    RANGE_ALL: {
        range: -1,
        label: 'ALL',
        string: 'All time',
    },
}