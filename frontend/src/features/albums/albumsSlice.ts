import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Album } from '../../types';

interface AlbumsState {
    items: Album[];
    loading: boolean;
}

const initialState: AlbumsState = { items: [], loading: false };

export const fetchAlbumsByArtist = createAsyncThunk(
    'albums/fetchByArtist',
    async (artistId: string) => {
        const response = await axios.get(`http://localhost:8000/albums?artist=${artistId}`);
        return response.data;
    }
);

export const deleteAlbum = createAsyncThunk(
    'albums/delete',
    async ({ id, token }: { id: string; token: string }) => {
        await axios.delete(`http://localhost:8000/albums/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return id;
    }
);

export const toggleAlbum = createAsyncThunk(
    'albums/toggle',
    async ({ id, token }: { id: string; token: string }) => {
        const response = await axios.patch(`http://localhost:8000/albums/${id}/togglePublished`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
);

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchAlbumsByArtist.pending, state => { state.loading = true; })
            .addCase(fetchAlbumsByArtist.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchAlbumsByArtist.rejected, state => { state.loading = false; })
            .addCase(deleteAlbum.fulfilled, (state, action) => { state.items = state.items.filter(a => a._id !== action.payload); })
            .addCase(toggleAlbum.fulfilled, (state, action) => {
                const index = state.items.findIndex(a => a._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            });
    }
});

export default albumsSlice.reducer;