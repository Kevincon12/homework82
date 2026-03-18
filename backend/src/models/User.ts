import mongoose from "mongoose";
import {UserFields} from "../types";

const UserSchema = new mongoose.Schema<UserFields>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});
const User = mongoose.model("User", UserSchema);

export default User;