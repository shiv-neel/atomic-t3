import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
    name: 'counter',
    initialState: {
        name: '',
        identity: '',
        cue: '',
        craving: '',
        response: '',
        reward: '',
        duration: 0,
        location: '',
        temporality: '',
        good: true,
        stashed: false
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setIdentity: (state, action) => {
            state.identity = action.payload
        },
        setCue: (state, action) => {
            state.cue = action.payload
        },
        setCraving: (state, action) => {
            state.craving = action.payload
        },
        setResponse: (state, action) => {
            state.response = action.payload
        },
        setReward: (state, action) => {
            state.reward = action.payload
        },
        setDuration: (state, action) => {
            state.duration = action.payload
        },
        setLocation: (state, action) => {
            state.location = action.payload
        },
        setTemporality: (state, action) => {
            state.temporality = action.payload
        },
        setGood: (state, action) => {
            state.good = action.payload
        },
        setStashed: (state, action) => {
            state.stashed = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setName, setIdentity, setCue, setCraving, setResponse, setReward, setDuration, setLocation, setTemporality, setGood, setStashed } = formSlice.actions

export default formSlice.reducer