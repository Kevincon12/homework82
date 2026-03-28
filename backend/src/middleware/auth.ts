import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { RequestWithUser } from "../types";

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        let token = req.get("Authorization");
        if (!token) return res.status(401).send({ error: "No token present" });

        token = token.trim();

        const user = await User.findOne({ token });
        if (!user) return res.status(401).send({ error: "Invalid token" });

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Server error" });
    }
};

export default auth;