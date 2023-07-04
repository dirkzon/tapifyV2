import { GetterTree } from "vuex";
import { PlaylistsState } from "./types";

export const Getters: GetterTree<PlaylistsState, object> = {
    getUsersPlaylists(state) {
        return state.userPlaylists;
    },

    getSearchedPlaylists(state) {
        return state.searchedPlaylists;
    },
}