import express from "express";
import User from "../models/User";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send({ error: "User already exist" });
        }

        const user = new User({
            username: username,
            password: password,
            token: randomUUID(),
        });

        await user.save();

        return res.send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
});

usersRouter.post("/sessions", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "Invalid password" });
        }

        user.token = randomUUID();
        await user.save();

        return res.send({ message: "Username and password correct!", user });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
});

export default usersRouter;