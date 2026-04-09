import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchAlbumsByArtist } from '../features/albums/albumsSlice';
import axios from 'axios';

const AddTrackPage = () => {
    const user = useAppSelector(state => state.users.user);
    const albums = useAppSelector(state => state.albums.items);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({ title: '', duration: '', number: '', album: '' });

    useEffect(() => { dispatch(fetchAlbumsByArtist('')); }, [dispatch]);

    if (!user) return <Typography>Вы должны войти, чтобы добавить трек</Typography>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/tracks', state, { headers: { Authorization: user.token } });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" mb={2}>Добавить трек</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField fullWidth label="Название" name="title" value={state.title} onChange={handleChange} margin="normal"/>
                <TextField fullWidth label="Длительность" name="duration" value={state.duration} onChange={handleChange} margin="normal"/>
                <TextField fullWidth label="Номер трека" name="number" value={state.number} onChange={handleChange} margin="normal"/>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Альбом</InputLabel>
                    <Select name="album" value={state.album} onChange={handleChange}>
                        {albums.map(a => <MenuItem key={a._id} value={a._id}>{a.title}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Создать</Button>
            </Box>
        </Box>
    );
};

export default AddTrackPage;