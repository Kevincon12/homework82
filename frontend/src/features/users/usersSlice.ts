import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
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
    async ({ username, password }: { username: string; password: string }) => {
        const response = await axios.post('http://localhost:8000/users/', {
            username,
            password,
        });
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
            state.loginError = null;
            state.registerError = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.loading = true;
                state.loginError = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.error as any;
            })

            .addCase(register.pending, state => {
                state.loading = true;
                state.registerError = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.registerError = action.error as any;
            })

            .addCase(googleLogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
            });
    },
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;