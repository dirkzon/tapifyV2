import { Module } from "vuex";
import { PlaylistsState } from "./types";
import { Actions } from "./actions";
import { Mutations } from "./mutations";
import { Getters } from "./getters";

export const PlaylistModule: Module<PlaylistsState, object> = {
    state: {
        userPlaylists: [],
        searchedPlaylists: [],
    },
    actions: Actions,
    mutations: Mutations,
    getters: Getters,
}