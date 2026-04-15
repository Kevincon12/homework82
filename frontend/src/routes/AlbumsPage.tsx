import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsByArtist, toggleAlbum, deleteAlbum } from '../features/albums/albumsSlice';
import type { AppDispatch, RootState } from '../app/store';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

const AlbumsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const albums = useSelector((state: RootState) => state.albums.items);
    const loading = useSelector((state: RootState) => state.albums.loading);
    const user = useSelector((state: RootState) => state.users.user);

    useEffect(() => { if (id) dispatch(fetchAlbumsByArtist(id)); }, [dispatch, id]);

    const visibleAlbums = user?.role === 'admin' ? albums : albums.filter(a => a.isPublished);
    const sortedAlbums = [...visibleAlbums].sort((a, b) => b.year - a.year);

    const handleDelete = (albumId: string) => { if (!user) return; dispatch(deleteAlbum({ id: albumId, token: user.token })); };
    const handleToggle = (albumId: string) => { if (!user) return; dispatch(toggleAlbum({ id: albumId, token: user.token })); };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>{albums[0]?.artist?.name || 'Albums'}</Typography>
            {loading ? <Typography>Loading...</Typography> : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {sortedAlbums.map(album => (
                        <Card key={album._id} sx={{ width: 200, cursor: 'pointer' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={album.cover
                                    ? `http://localhost:8000/uploads/albums/${album.cover}`
                                    : 'https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg'}
                                onClick={() => navigate(`/album/${album._id}`)}
                            />
                            <CardContent>
                                <Typography variant="h6">{album.title}</Typography>
                                <Typography color="textSecondary">{album.year}</Typography>
                                {user?.role === 'admin' && (
                                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                        <Button size="small" color="error" variant="contained" onClick={() => handleDelete(album._id)}>Delete</Button>
                                        <Button size="small" variant="contained" onClick={() => handleToggle(album._id)}>
                                            {album.isPublished ? 'Unpublish' : 'Publish'}
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default AlbumsPage;