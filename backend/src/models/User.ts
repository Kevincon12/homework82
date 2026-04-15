import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserFields } from "../types";

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema<UserFields>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"],
    },
    googleId: {
        type: String,
        required: false,
    },
});

UserSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) return;

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model("User", UserSchema);

export default User;