import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { register } from '../features/users/usersSlice';

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        username: '',
        password: '',
        displayName: '',
        avatar: '',
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(register(state)).unwrap();
        navigate('/');
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
            <Typography variant="h5">Register</Typography>

            <Box component="form" onSubmit={submitHandler}>
                <TextField fullWidth label="Username" name="username" onChange={inputChangeHandler} margin="normal" />
                <TextField fullWidth label="Password" name="password" type="password" onChange={inputChangeHandler} margin="normal" />
                <TextField fullWidth label="Display Name" name="displayName" onChange={inputChangeHandler} margin="normal" />
                <TextField fullWidth label="Avatar URL" name="avatar" onChange={inputChangeHandler} margin="normal" />

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default Register;