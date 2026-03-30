import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ArtistsPage from "./routes/ArtistsPage";
import AlbumsPage from "./routes/AlbumsPage";
import TracksPage from "./routes/TracksPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import TrackHistoryPage from "./routes/TrackHistoryPage";
import { useAppSelector, useAppDispatch } from './app/hooks';
import { logout } from './features/users/usersSlice';

const App = () => {
    const user = useAppSelector(state => state.users.user);
    const dispatch = useAppDispatch();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Music App
                    </Typography>

                    <Button color="inherit" component={Link} to="/">
                        To main page
                    </Button>

                    {!user ? (
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/track-history">
                                History
                            </Button>

                            <Button color="inherit" onClick={() => dispatch(logout())}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 3 }}>
                <Routes>
                    <Route path="/" element={<ArtistsPage />} />
                    <Route path="/albums/:id" element={<AlbumsPage />} />
                    <Route path="/album/:id" element={<TracksPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/track-history" element={<TrackHistoryPage />} />
                </Routes>
            </Container>
        </>
    );
};

export default App;