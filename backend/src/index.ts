import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import artistsRouter from "./routes/artists";
import albumsRouter from "./routes/albums";
import tracksRouter from "./routes/tracks";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/music-api");

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});