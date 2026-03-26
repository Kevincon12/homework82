import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ArtistsPage from "./routes/ArtistsPage";

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
                {/* Маршруты для альбомов и треков потома сюды */}
            </Routes>
        </Container>
    </>
);

export default App;