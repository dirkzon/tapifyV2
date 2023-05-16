import { GetterTree } from "vuex";
import { PlaylistState } from "./types";

export const Getters: GetterTree<[PlaylistState], object> = {
    getUsersPlaylists(state) {
        //removes first empty element
        state.shift();
        return state;
    }
}