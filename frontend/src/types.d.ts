export interface Artist {
    _id: string;
    name: string;
    photo: string;
    group: string;
    information?: string;
    isPublished: boolean;
}

export interface Album {
    _id: string;
    title: string;
    year: number;
    cover: string;
    artist: string;
    artistName?: string;
}

export interface Track {
    _id: string;
    title: string;
    duration: string;
    number: number;
}