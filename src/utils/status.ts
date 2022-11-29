export type Status = 'STATUS_SUCCESS' | 'STATUS_NEUTRAL' | 'STATUS_FAILURE' | 'STATUS_NULL'

export const STATUS_SUCCESS: Status = 'STATUS_SUCCESS'
export const STATUS_NEUTRAL: Status = 'STATUS_NEUTRAL'
export const STATUS_FAILURE: Status = 'STATUS_FAILURE'
export const STATUS_NULL: Status = 'STATUS_NULL'

export const STATUS_LABELS = {
    STATUS_SUCCESS: '+',
    STATUS_NEUTRAL: 'o',
    STATUS_FAILURE: '-',
    STATUS_NULL: '?'
}

