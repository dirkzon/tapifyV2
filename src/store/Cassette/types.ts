export interface CassetteState {
    sides: Array<CassetteSideState>,
    duration: number,
    name: string,
    description: string,
    image: string,
    owner: Owner,
}

export interface Owner {
    name: string;
    url: string;
    userIsOwner: boolean;
}

export interface CassetteSideState {
    duration: number,
    length: number,
    tracks: Array<TrackState>,
}

export interface TrackState {
    name: string;
    id: string;
    image?: string;
    duration: number;
    artists: string[];
    locked: boolean;
    danceability?: number;
    instrumentalness?: number;
    liveness?: number;
    tempo?: number;
    energy?: number;
    preview: any;
    previewPlaying: boolean;
}