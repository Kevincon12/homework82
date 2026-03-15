import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET tracks");
});

router.post("/", (req, res) => {
    res.send("POST tracks");
});

export default router;