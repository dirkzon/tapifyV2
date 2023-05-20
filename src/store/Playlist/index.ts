import { Module } from "vuex";
import { PlaylistState } from "./types";
import { Actions } from "./actions";
import { Mutations } from "./mutations";
import { Getters } from "./getters";

export const PlaylistModule: Module<[PlaylistState], object> = {
    state: [{
        name: "",
        url: "",
        image: "",
        id: "",
        creator: "",
    }],
    actions: Actions,
    mutations: Mutations,
    getters: Getters,
}