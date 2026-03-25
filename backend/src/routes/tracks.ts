import express from "express";
import Track from "../models/Track";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { album } = req.query;
        const filter: any = {};
        if (album) filter.album = album;

        const tracks = await Track.find(filter)
            .sort({ number: 1 })
            .populate({
                path: "album",
                populate: { path: "artist" }
            });

        res.send(tracks);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, album, duration, number } = req.body;

        const track = new Track({
            title,
            album,
            duration,
            number
        });

        await track.save();
        res.send(track);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const track = await Track.findById(req.params.id).populate({
            path: "album",
            populate: { path: "artist" }
        });

        if (!track) return res.status(404).send({ error: "Track not found" });

        res.send(track);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

export default router;