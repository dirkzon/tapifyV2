import { Module } from "vuex";
import { CassetteState } from "./types";
import { Actions } from "./actions";
import { Mutations } from "./mutations";
import { Getters } from "./getters";

export const CassetteModule: Module<CassetteState, object> = {
    state: {
        duration: 0,
        sides: [
            {
                duration: 0,
                tracks: [],
            },
            {
                duration: 0,
                tracks: [],
            },
        ],
    },
    actions: Actions,
    mutations: Mutations,
    getters: Getters
}