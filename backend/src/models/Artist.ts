import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    information: {
        type: String
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;