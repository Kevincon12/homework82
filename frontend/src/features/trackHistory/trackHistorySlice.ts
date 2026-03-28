import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface TrackHistoryItem {
    _id: string
    user: string
    track: string
    datetime: string
}

interface TrackHistoryState {
    items: TrackHistoryItem[]
    loading: boolean
}

const initialState: TrackHistoryState = {
    items: [],
    loading: false,
}

export const addTrackHistory = createAsyncThunk(
    'trackHistory/add',
    async ({ trackId, token }: { trackId: string; token: string }) => {
        const response = await axios.post(
            'http://localhost:8000/track-history',
            { track: trackId },
            { headers: { Authorization: token } }
        )
        return response.data
    }
)

const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTrackHistory.pending, (state) => {
                state.loading = true
            })
            .addCase(addTrackHistory.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
            })
            .addCase(addTrackHistory.rejected, (state) => {
                state.loading = false
            })
    },
})

export default trackHistorySlice.reducer