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
import AddArtistPage from "./routes/AddArtistPage";
import AddAlbumPage from "./routes/AddAlbumPage";
import AddTrackPage from "./routes/AddTrackPage";

const App = () => {
    const user = useAppSelector(state => state.users.user);
    const dispatch = useAppDispatch();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Music App (hw91)
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

                            <Button color="inherit" component={Link} to="/add-artist">
                                Добавить артиста
                            </Button>
                            <Button color="inherit" component={Link} to="/add-album">
                                Добавить альбом
                            </Button>
                            <Button color="inherit" component={Link} to="/add-track">
                                Добавить трек
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
                    <Route path="/add-artist" element={<AddArtistPage />} />
                    <Route path="/add-album" element={<AddAlbumPage />} />
                    <Route path="/add-track" element={<AddTrackPage />} />
                </Routes>
            </Container>
        </>
    );
};

export default App;