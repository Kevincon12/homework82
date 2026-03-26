export interface UserFields {
    username: string;
    password: string;
    token: string;
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