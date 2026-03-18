import express from "express";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", async (req, res) => {
    try {
        const token = req.get("Authorization");
        if (!token) return res.status(401).send({ error: "No token present" });

        const user = await User.findOne({ token });
        if (!user) return res.status(401).send({ error: "Invalid token" });

        const { track } = req.body;
        if (!track) return res.status(400).send({ error: "Track ID required" });

        const trackHistory = new TrackHistory({
            user: user._id,
            track,
            datetime: new Date()
        });

        await trackHistory.save();
        return res.send(trackHistory);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
});

export default trackHistoryRouter;