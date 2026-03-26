import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type {Artist} from "../../types";

interface ArtistsState {
    items: Artist[],
    loading: boolean
};

const initialState: ArtistsState = {
    items: [],
    loading: false
};

export const fetchArtists = createAsyncThunk(
    'artists/fetchAll',
    async () => {
        const response = await axios.get('http://localhost:8000/artists');
        return response.data;
    }
);

const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchArtists.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.loading = false
            })
    },
});

export default artistsSlice.reducer