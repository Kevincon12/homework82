import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Album } from '../../types';

interface AlbumsState {
    items: Album[];
    loading: boolean;
}

const initialState: AlbumsState = {
    items: [],
    loading: false,
};

export const fetchAlbumsByArtist = createAsyncThunk(
    'albums/fetchByArtist',
    async (artistId: string) => {
        const response = await axios.get(`http://localhost:8000/albums?artist=${artistId}`);
        return response.data;
    }
);

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbumsByArtist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbumsByArtist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAlbumsByArtist.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default albumsSlice.reducer;