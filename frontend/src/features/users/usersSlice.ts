import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
    displayName: string;
    avatar?: string;
}

interface UserState {
    user: User | null;
    loginError: { error: string } | null;
    registerError: { error: string } | null;
    loading: boolean;
}

const initialState: UserState = {
    user: null,
    loginError: null,
    registerError: null,
    loading: false,
};

export const login = createAsyncThunk(
    'users/login',
    async ({ username, password }: { username: string; password: string }) => {
        const response = await axios.post('http://localhost:8000/users/sessions', {
            username,
            password,
        });
        return response.data;
    }
);

export const register = createAsyncThunk(
    'users/register',
    async (data: { username: string; password: string; displayName: string; avatar?: string }) => {
        const response = await axios.post('http://localhost:8000/users/', data);
        return response.data;
    }
);

export const googleLogin = createAsyncThunk(
    'users/googleLogin',
    async (credential: string) => {
        const response = await axios.post('http://localhost:8000/users/google', {
            credential,
        });

        return response.data;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
            });
    },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;