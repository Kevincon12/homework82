import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTracksByAlbum } from '../features/tracks/tracksSlice';
import type { AppDispatch, RootState } from '../app/store';
import { Card, CardContent, Typography, Box } from '@mui/material';

const AlbumDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const tracks = useSelector((state: RootState) => state.tracks.items);
    const loading = useSelector((state: RootState) => state.tracks.loading);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracksByAlbum(id));
        }
    }, [dispatch, id]);

    const sortedTracks = [...tracks].sort((a, b) => a.number - b.number);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Tracks
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {sortedTracks.map((track) => (
                        <Card key={track._id} sx={{ width: 250 }}>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    {track.number}. {track.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {track.duration}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default AlbumDetailPage;