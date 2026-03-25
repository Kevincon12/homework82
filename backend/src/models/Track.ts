import mongoose, { Schema, Document } from "mongoose";

export interface ITrack extends Document {
    title: string;
    album: mongoose.Types.ObjectId;
    number: number;
    duration?: string;
}

const TrackSchema: Schema<ITrack> = new Schema({
    title: { type: String, required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album", required: true },
    number: { type: Number, required: true },
    duration: { type: String }
});

const Track = mongoose.model<ITrack>("Track", TrackSchema);

export default Track;