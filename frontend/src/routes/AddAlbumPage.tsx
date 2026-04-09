import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchArtists } from '../features/artists/artistsSlice';
import axios from 'axios';

const AddAlbumPage = () => {
    const user = useAppSelector(state => state.users.user);
    const artists = useAppSelector(state => state.artists.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({ title: '', year: '', cover: '', artist: '' });

    useEffect(() => { dispatch(fetchArtists()); }, [dispatch]);

    if (!user) return <Typography>Вы должны войти, чтобы добавить альбом</Typography>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/albums', state, { headers: { Authorization: user.token } });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" mb={2}>Добавить альбом</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Название" name="title" value={state.title} onChange={handleChange} margin="normal"/>
                <TextField fullWidth label="Год" name="year" value={state.year} onChange={handleChange} margin="normal"/>
                <TextField fullWidth label="Обложка URL" name="cover" value={state.cover} onChange={handleChange} margin="normal"/>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Исполнитель</InputLabel>
                    <Select name="artist" value={state.artist} onChange={handleChange}>
                        {artists.map(a => <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Создать</Button>
            </Box>
        </Box>
    );
};

export default AddAlbumPage;