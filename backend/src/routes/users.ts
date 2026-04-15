import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";
import { OAuth2Client } from "google-auth-library";

const usersRouter = express.Router();

const client = new OAuth2Client(process.env.CLIENT_ID);

usersRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send({ error: "User already exist" });
        }

        const user = new User({
            username,
            password,
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

        const isMatch = user.password
            ? await bcrypt.compare(password, user.password)
            : false;

        if (!isMatch) {
            return res.status(400).send({ error: "Invalid password" });
        }

        user.token = randomUUID();
        await user.save();

        return res.send({
            message: "Username and password correct!",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error" });
    }
});

usersRouter.post("/google", async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({ error: "Invalid Google token" });
        }

        const email = payload.email!;
        const googleId = payload.sub!;

        let user = await User.findOne({ username: email });

        if (!user) {
            user = new User({
                username: email,
                password: null,
                googleId,
                token: randomUUID(),
            });

            await user.save();
        }

        user.token = randomUUID();
        await user.save();

        return res.send({
            user,
            message: "Google login success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Google auth error" });
    }
});

export default usersRouter;