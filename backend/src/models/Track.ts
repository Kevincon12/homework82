import mongoose, { Schema, Document } from "mongoose";

export interface ITrack extends Document {
    title: string;
    album: mongoose.Types.ObjectId;
    number: number;
    duration?: string;
    isPublished: boolean;
}

const TrackSchema: Schema<ITrack> = new Schema({
    title: { type: String, required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true },
    number: { type: Number, required: true },
    duration: { type: String },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Track = mongoose.model<ITrack>("Track", TrackSchema);

export default Track;