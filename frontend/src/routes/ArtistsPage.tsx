import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists, deleteArtist, toggleArtist } from '../features/artists/artistsSlice';
import type { AppDispatch, RootState } from '../app/store';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ArtistsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artists = useSelector((state: RootState) => state.artists.items);
    const user = useSelector((state: RootState) => state.users.user);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const visibleArtists =
        user?.role === 'admin'
            ? artists
            : artists.filter(artist => artist.isPublished);

    const handleDelete = (id: string) => {
        if (!user) return;
        dispatch(deleteArtist({ id, token: user.token }));
    };

    const handleToggle = (id: string) => {
        if (!user) return;
        dispatch(toggleArtist({ id, token: user.token }));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Artists
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {visibleArtists.map((artist) => (
                    <Card key={artist._id} sx={{ width: 250 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={
                                artist.photo
                                    ? `http://localhost:8000/uploads/artists/${artist.photo}`
                                    : 'https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg'
                            }
                        />

                        <CardContent>
                            <Typography variant="h6">
                                {artist.name}
                            </Typography>

                            {!artist.isPublished && (
                                <Typography color="error">
                                    Не опубликовано
                                </Typography>
                            )}

                            {user?.role === 'admin' && (
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <Button
                                        size="small"
                                        color="error"
                                        variant="contained"
                                        onClick={() => handleDelete(artist._id)}
                                    >
                                        Delete
                                    </Button>

                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleToggle(artist._id)}
                                    >
                                        Toggle
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