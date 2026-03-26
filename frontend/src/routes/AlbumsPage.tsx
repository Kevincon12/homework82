import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsByArtist } from '../features/albums/albumsSlice';
import type { AppDispatch, RootState } from '../app/store';
import { Card, CardContent, Typography } from '@mui/material';

const AlbumsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const albums = useSelector((state: RootState) => state.albums.items);
    const loading = useSelector((state: RootState) => state.albums.loading);

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbumsByArtist(id));
        }
    }, [dispatch, id]);

    const sortedAlbums = [...albums].sort((a, b) => b.year - a.year);

    return (
        <div style={{ padding: 16 }}>
            <Typography variant="h4" gutterBottom>
                {albums[0]?.artistName || 'Albums'}
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {sortedAlbums.map((album) => (
                        <Card
                            key={album._id}
                            style={{ width: 200, cursor: 'pointer' }}
                            onClick={() => navigate(`/album/${album._id}`)}
                        >
                            <img
                                src={
                                    album.cover
                                        ? `http://localhost:8000/uploads/albums/${album.cover}`
                                        : 'https://t3.ftcdn.net/jpg/10/22/24/80/360_F_1022248039_7LDxHRi3Mlt9BK3wzLBUGZp9XAO1gt2s.jpg'
                                }
                                alt={album.title}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography variant="h6">{album.title}</Typography>
                                <Typography color="textSecondary">{album.year}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AlbumsPage;