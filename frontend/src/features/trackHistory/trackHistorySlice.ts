import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Track {
    _id: string;
    title: string;
    album: string;
    number: number;
    duration: string;
}

interface TrackHistoryItem {
    _id: string;
    user: string;
    track: Track;
    datetime: string;
}

interface TrackHistoryState {
    items: TrackHistoryItem[];
    loading: boolean;
}

const initialState: TrackHistoryState = {
    items: [],
    loading: false,
};

export const addTrackHistory = createAsyncThunk(
    'trackHistory/add',
    async ({ trackId, token }: { trackId: string; token: string }) => {
        const response = await axios.post(
            'http://localhost:8000/track-history',
            { track: trackId },
            { headers: { Authorization: token } }
        );
        return response.data as TrackHistoryItem;
    }
);

export const fetchTrackHistory = createAsyncThunk(
    'trackHistory/fetch',
    async (token: string) => {
        const response = await axios.get(
            'http://localhost:8000/track-history',
            { headers: { Authorization: token } }
        );
        return response.data as TrackHistoryItem[];
    }
);

const trackHistorySlice = createSlice({
    name: 'trackHistory',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addTrackHistory.pending, state => {
                state.loading = true;
            })
            .addCase(addTrackHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addTrackHistory.rejected, state => {
                state.loading = false;
            })
            .addCase(fetchTrackHistory.pending, state => {
                state.loading = true;
            })
            .addCase(fetchTrackHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTrackHistory.rejected, state => {
                state.loading = false;
            });
    },
});

export default trackHistorySlice.reducer;