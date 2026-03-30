import express, { Response } from "express";
import TrackHistory from "../models/TrackHistory";
import auth from "../middleware/auth";
import { RequestWithUser } from "../types";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post(
    "/",
    auth,
    async (req: RequestWithUser, res: Response) => {
        try {
            const { track } = req.body;

            if (!track) return res.status(400).send({ error: "Track ID required" });

            const trackHistory = new TrackHistory({
                user: req.user!._id,
                track,
                datetime: new Date(),
            });

            await trackHistory.save();
            return res.send(trackHistory);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: "Server error" });
        }
    }
);

trackHistoryRouter.get("/", auth, async (req: RequestWithUser, res: Response) => {
        try {
            const history = await TrackHistory.find({ user: req.user!._id })
                .populate('track')
                .sort({ datetime: -1 });

            return res.send(history);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: "Server error" });
        }
    }
);

export default trackHistoryRouter;