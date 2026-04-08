import mongoose, { Schema, Document } from "mongoose";

export interface IAlbum extends Document {
    title: string;
    artist: mongoose.Types.ObjectId;
    year: number;
    cover?: string;
    isPublished: boolean;
}

const AlbumSchema: Schema = new Schema({
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
    year: { type: Number, required: true },
    cover: { type: String },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

export default mongoose.model<IAlbum>("Album", AlbumSchema);