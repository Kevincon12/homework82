import express from "express";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
import Artist from "../models/Artist";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/artists");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.post("/", auth, upload.single("photo"), async (req, res) => {
    try {
        const { name, information } = req.body;
        let photo = req.file ? req.file.filename : undefined;

        const artist = new Artist({
            name,
            photo,
            information
        });

        await artist.save();
        res.send(artist);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.delete("/:id", auth, permit("admin"), async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);

        if (!artist) {
            return res.status(404).send({ error: "Artist not found" });
        }

        return res.send({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
});

export default router;