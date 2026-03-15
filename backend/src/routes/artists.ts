import express from "express";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
import Artist from "../models/Artist";

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

router.post("/", upload.single("photo"), async (req, res) => {
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

export default router;