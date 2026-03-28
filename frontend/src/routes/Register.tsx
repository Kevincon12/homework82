import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register } from '../features/users/usersSlice';

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(state => state.users.registerError);

    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
            <Typography variant="h5" mb={2}>Register</Typography>

            {error && (
                <Typography color="error">{error.error}</Typography>
            )}

            <Box component="form" onSubmit={submitHandler}>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={state.username}
                    onChange={inputChangeHandler}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={inputChangeHandler}
                    margin="normal"
                />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default Register;