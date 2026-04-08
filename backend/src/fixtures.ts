import mongoose from "mongoose";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/music-api");

    const db = mongoose.connection;

    try {
        await db.dropCollection("artists");
        await db.dropCollection("albums");
        await db.dropCollection("tracks");
    } catch {}

    const [artist1, artist2] = await Artist.create(
        {
            name: "Artist One",
            information: "Информация об Artist One",
            photo: "artist1.jpg",
            isPublished: true,
        },
        {
            name: "Artist Two",
            information: "Информация об Artist Two",
            photo: "artist2.jpg",
            isPublished: false,
        }
    );

    const [album1, album2] = await Album.create(
        {
            title: "First Album",
            artist: artist1._id,
            year: 2020,
            cover: "album1.jpg",
            isPublished: true,
        },
        {
            title: "Second Album",
            artist: artist2._id,
            year: 2022,
            cover: "album2.jpg",
            isPublished: false,
        }
    );

    await Track.create(
        {
            title: "Track One",
            album: album1._id,
            number: 1,
            duration: "3:45",
            isPublished: true,
        },
        {
            title: "Track Two",
            album: album1._id,
            number: 2,
            duration: "4:12",
            isPublished: false,
        },
        {
            title: "Track Three",
            album: album2._id,
            number: 1,
            duration: "2:58",
            isPublished: false,
        }
    );

    console.log("Фикстуры загружены!");
    await db.close();
};

run().catch(console.error);