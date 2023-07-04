import { MutationTree } from "vuex";
import { PlaylistsState } from "./types";

export const Mutations: MutationTree<PlaylistsState> = {
    SET_USERS_PLAYLISTS(state, payload) {
        state.userPlaylists.push({
            image: payload.images[0].url,
            name: payload.name,
            creator: payload.owner.display_name,
            id: payload.id,
            url: payload.external_urls.spotify,
        });
    },

    EMPTY_USERS_PLAYLISTS(state) {
        state.userPlaylists.splice(0, state.userPlaylists.length);
    },

    SET_SEARCHED_PLAYLISTS(state, payload) {
        state.searchedPlaylists.push({
            image: payload.images[0].url,
            name: payload.name,
            creator: payload.owner.display_name,
            id: payload.id,
            url: payload.external_urls.spotify,
        });
    },

    EMPTY_SEARCHED_PLAYLISTS(state) {
        state.searchedPlaylists.splice(0, state.userPlaylists.length);
    },
}