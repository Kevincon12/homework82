import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Track } from '../../types';

interface TracksState {
    items: Track[];
    loading: boolean;
}

const initialState: TracksState = {
    items: [],
    loading: false,
};

export const fetchTracksByAlbum = createAsyncThunk(
    'tracks/fetchByAlbum',
    async (albumId: string) => {
        const response = await axios.get(`http://localhost:8000/tracks?albumId=${albumId}`);
        return response.data;
    }
);

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTracksByAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTracksByAlbum.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTracksByAlbum.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default tracksSlice.reducer;