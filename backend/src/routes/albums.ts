import express from "express";
import path from "path";
import multer from "multer";
import Album from "../models/Album";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/albums");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const { artist } = req.query;
        let albums;

        if (artist) {
            albums = await Album.find({ artist })
                .sort({ year: -1 })
                .populate("artist");
        } else {
            albums = await Album.find()
                .sort({ year: -1 })
                .populate("artist");
        }

        res.send(albums);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.post("/", upload.single("cover"), async (req, res) => {
    try {
        const { title, artist, year } = req.body;
        const cover = req.file ? req.file.filename : undefined;

        const album = new Album({
            title,
            artist,
            year,
            cover
        });

        await album.save();
        res.send(album);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate("artist");
        if (!album) return res.status(404).send({ error: "Album not found" });
        res.send(album);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

export default router;