import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
    _id: string
    username: string
    token: string
}

interface LoginMutation {
    username: string
    password: string
}

interface GlobalError {
    error: string
}

interface UsersState {
    user: User | null
    loginLoading: boolean
    loginError: GlobalError | null
}

const initialState: UsersState = {
    user: null,
    loginLoading: false,
    loginError: null,
}

export const login = createAsyncThunk<
    User,
    LoginMutation,
    { rejectValue: GlobalError }
>(
    'users/login',
    async (loginData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/users/sessions',
                loginData
            )
            return response.data.user
        } catch (e: any) {
            if (e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loginLoading = true
                state.loginError = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginLoading = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loginLoading = false
                state.loginError = action.payload || null
            })
    },
})

export default usersSlice.reducer