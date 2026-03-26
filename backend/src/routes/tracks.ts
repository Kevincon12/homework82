import express from "express";
import Track from "../models/Track";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { albumId } = req.query;
        if (!albumId) return res.status(400).send({ error: "albumId is required" });

        const tracks = await Track.find({ album: albumId })
            .sort({ number: 1 });

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
        const track = await Track.findById(req.params.id);
        if (!track) return res.status(404).send({ error: "Track not found" });
        res.send(track);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

export default router;