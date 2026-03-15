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
    }
});

const Artist = mongoose.model("Artist", ArtistSchema);

export default Artist;