import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET albums");
});

router.post("/", (req, res) => {
    res.send("POST albums");
});

router.get("/:id", (req, res) => {
    res.send("GET album by id");
});

export default router;