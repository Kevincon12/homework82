import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Artist } from "../../types";

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

export const deleteArtist = createAsyncThunk(
    'artists/delete',
    async ({ id, token }: { id: string; token: string }) => {
        await axios.delete(`http://localhost:8000/artists/${id}`, {
            headers: { Authorization: token }
        });
        return id;
    }
);

export const toggleArtist = createAsyncThunk(
    'artists/toggle',
    async ({ id, token }: { id: string; token: string }) => {
        const response = await axios.patch(
            `http://localhost:8000/artists/${id}/togglePublished`,
            {},
            { headers: { Authorization: token } }
        );
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
            .addCase(deleteArtist.fulfilled, (state, action) => {
                state.items = state.items.filter(a => a._id !== action.payload);
            })
            .addCase(toggleArtist.fulfilled, (state, action) => {
                const index = state.items.findIndex(a => a._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
    },
});

export default artistsSlice.reducer;