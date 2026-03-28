import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTracksByAlbum } from '../features/tracks/tracksSlice';
import { addTrackHistory } from '../features/trackHistory/trackHistorySlice';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

const TracksPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(state => state.tracks.items);
    const loading = useAppSelector(state => state.tracks.loading);
    const user = useAppSelector(state => state.users.user);

    useEffect(() => {
        if (id) {
            dispatch(fetchTracksByAlbum(id));
        }
    }, [dispatch, id]);

    const sortedTracks = [...tracks].sort((a, b) => a.number - b.number);

    const handlePlay = (trackId: string) => {
        if (!user) return;
        dispatch(addTrackHistory({ trackId, token: user.token }));
        alert('Playing track: ' + trackId);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Tracks
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {sortedTracks.map(track => (
                        <Card key={track._id} sx={{ width: 250 }}>
                            <CardContent>
                                <Typography variant="subtitle1">
                                    {track.number}. {track.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {track.duration}
                                </Typography>
                                {user && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ mt: 1 }}
                                        onClick={() => handlePlay(track._id)}
                                    >
                                        Play
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TracksPage;