import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists, deleteArtist, toggleArtist } from '../features/artists/artistsSlice';
import type { AppDispatch, RootState } from '../app/store';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArtistsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artists = useSelector((state: RootState) => state.artists.items);
    const user = useSelector((state: RootState) => state.users.user);
    const navigate = useNavigate();

    useEffect(() => { dispatch(fetchArtists()); }, [dispatch]);

    const visibleArtists = user?.role === 'admin' ? artists : artists.filter(a => a.isPublished);

    const handleDelete = (id: string) => {
        if (!user) return;
        dispatch(deleteArtist({ id, token: user.token }));
    };

    const handleToggle = (id: string) => {
        if (!user) return;
        dispatch(toggleArtist({ id, token: user.token }));
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>Artists</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {visibleArtists.map(artist => (
                    <Card key={artist._id} sx={{ width: 250, cursor: 'pointer' }} onClick={() => navigate(`/albums/${artist._id}`)}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={artist.photo
                                ? `http://localhost:8000/uploads/artists/${artist.photo}`
                                : 'https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg'}
                        />
                        <CardContent>
                            <Typography variant="h6">{artist.name}</Typography>
                            {user?.role === 'admin' && (
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <Button size="small" color="error" variant="contained" onClick={(e) => { e.stopPropagation(); handleDelete(artist._id); }}>Delete</Button>
                                    <Button size="small" variant="contained" onClick={(e) => { e.stopPropagation(); handleToggle(artist._id); }}>
                                        {artist.isPublished ? 'Unpublish' : 'Publish'}
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ArtistsPage;