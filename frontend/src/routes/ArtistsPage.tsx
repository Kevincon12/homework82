import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists } from '../features/artists/artistsSlice';
import type { AppDispatch, RootState } from '../app/store';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ArtistsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const artists = useSelector((state: RootState) => state.artists.items);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Artists
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                {artists.map((artist) => (
                    <Card
                        key={artist._id}
                        sx={{
                            width: 250,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="140"
                            image={artist.photo ? `http://localhost:8000/uploads/artists/${artist.photo}` : 'https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg'}
                            alt={artist.name}
                        />
                        <CardContent>
                            <Typography variant="h6">{artist.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {artist.group}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ArtistsPage;