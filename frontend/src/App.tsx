import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ArtistsPage from "./routes/ArtistsPage";
import AlbumsPage from "./routes/AlbumsPage.tsx";

const App = () => (
    <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Music App
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    To main page
                </Button>
            </Toolbar>
        </AppBar>

        <Container sx={{ mt: 3 }}>
            <Routes>
                <Route path="/" element={<ArtistsPage />} />
                <Route path="/albums/:id" element={<AlbumsPage />} />
            </Routes>
        </Container>
    </>
);

export default App;