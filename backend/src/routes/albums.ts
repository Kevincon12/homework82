import express from "express";
import path from "path";
import multer from "multer";
import Album from "../models/Album";
import type { AlbumWithArtistName } from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/albums"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const { artist } = req.query;
        let albums = await Album.find(artist ? { artist } : {})
            .sort({ year: -1 })
            .populate("artist", "name");

        const albumsWithArtistName: AlbumWithArtistName[] = albums.map(album => ({
            _id: album._id.toString(),
            title: album.title,
            year: album.year,
            cover: album.cover,
            isPublished: album.isPublished,
            artist: {
                _id: (album.artist as any)?._id?.toString() || "",
                name: (album.artist as any)?.name || ""
            }
        }));

        res.send(albumsWithArtistName);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.post("/", auth, upload.single("cover"), async (req, res) => {
    try {
        const { title, artist, year } = req.body;
        const cover = req.file ? req.file.filename : undefined;

        const album = new Album({ title, artist, year, cover, isPublished: false });
        await album.save();
        res.send(album);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate("artist", "name");
        if (!album) return res.status(404).send({ error: "Album not found" });

        const albumWithArtistName: AlbumWithArtistName = {
            _id: album._id.toString(),
            title: album.title,
            year: album.year,
            cover: album.cover,
            isPublished: album.isPublished,
            artist: {
                _id: (album.artist as any)?._id?.toString() || "",
                name: (album.artist as any)?.name || ""
            }
        };

        res.send(albumWithArtistName);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.delete("/:id", auth, permit("admin"), async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);
        if (!album) return res.status(404).send({ error: "Album not found" });
        res.send({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.patch("/:id/togglePublished", auth, permit("admin"), async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).send({ error: "Album not found" });

        album.isPublished = !album.isPublished;
        await album.save();
        res.send(album);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

export default router;