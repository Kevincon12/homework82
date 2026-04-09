import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import axios from 'axios';

const AddArtistPage = () => {
    const user = useAppSelector(state => state.users.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [state, setState] = useState({
        name: '',
        photo: '',
        group: '',
        information: '',
    });

    if (!user) return <Typography>Вы должны войти, чтобы добавить артиста</Typography>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8000/artists',
                state,
                { headers: { Authorization: user.token } }
            );
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" mb={2}>Добавить артиста</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Имя" name="name" value={state.name} onChange={handleChange} margin="normal"/>
                <TextField fullWidth label="Фото URL" name="photo" value={state.photo} onChange={handleChange} margin="normal"/>
                <TextField fullWidth label="Группа" name="group" value={state.group} onChange={handleChange} margin="normal"/>
                <TextField fullWidth label="Информация" name="information" value={state.information} onChange={handleChange} margin="normal"/>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Создать</Button>
            </Box>
        </Box>
    );
};

export default AddArtistPage;