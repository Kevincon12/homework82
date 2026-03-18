import mongoose from "mongoose";
import {UserFields} from "../types";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

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

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
});

UserSchema.set('toJSON', {
   transform: (_doc, ret, _options) => {
       const {password, ...rest} = ret;
       return rest;
   }
});

const User = mongoose.model("User", UserSchema);

export default User;