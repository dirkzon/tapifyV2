export interface PlaylistsState {
    userPlaylists: Array<PlaylistState>
    searchedPlaylists: Array<PlaylistState>
}

export interface PlaylistState {
    name: string;
    url: string;
    image: string;
    id: string;
    creator: string;
}