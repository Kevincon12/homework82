import { HydratedDocument } from "mongoose";
import { Request as ExpressRequest } from "express";

export interface IUser {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface AlbumWithArtistName {
    _id: string;
    title: string;
    year: number;
    cover?: string;
    artist: {
        _id: string;
        name: string;
    };
}

export interface RequestWithUser extends ExpressRequest {
    user?: HydratedDocument<IUser>;
}