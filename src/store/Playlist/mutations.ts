import { MutationTree } from "vuex";
import { PlaylistState } from "./types";

export const Mutations: MutationTree<[PlaylistState]> = {
    SET_PLAYLIST(state, payload) {
        state.push({
            image: payload.images[0].url,
            name: payload.name,
            creator: payload.owner.display_name,
            id: payload.id,
            url: payload.external_urls.spotify,
        });
    },

    EMPTY_PLAYLISTS(state) {
        state.splice(0, state.length);
    },
}