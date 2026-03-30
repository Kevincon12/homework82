import { useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTrackHistory } from '../features/trackHistory/trackHistorySlice';

const TrackHistoryPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.users.user);
    const history = useAppSelector(state => state.trackHistory.items);
    const loading = useAppSelector(state => state.trackHistory.loading);

    useEffect(() => {
        if (user) {
            dispatch(fetchTrackHistory(user.token));
        }
    }, [dispatch, user]);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Track History
            </Typography>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : history.length === 0 ? (
                <Typography>No history yet</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {history.map(item => (
                        <Card key={item._id} sx={{ width: 250 }}>
                            <CardContent>
                                <Typography>
                                    {item.track.number}. {item.track.title}
                                </Typography>
                                <Typography variant="body2">
                                    Duration: {item.track.duration}
                                </Typography>
                                <Typography variant="body2">
                                    {new Date(item.datetime).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TrackHistoryPage;