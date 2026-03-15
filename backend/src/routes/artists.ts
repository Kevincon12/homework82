import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET artists");
});

router.post("/", (req, res) => {
    res.send("POST artists");
});

export default router;