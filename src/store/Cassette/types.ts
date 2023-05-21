export interface CassetteState {
    sides: Array<CassetteSideState>,
    duration: number
}

export interface CassetteSideState {
    duration: number,
    tracks: Array<TrackState>,
}

export interface TrackState {
    name: string;
    id: string;
    image?: string;
    duration: number;
    artists: string[];
    locked: boolean;
    hidden: boolean;
    danceability?: number;
    instrumentalness?: number;
    liveness?: number;
    tempo?: number;
    energy?: number;
}