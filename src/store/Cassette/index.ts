import { Module } from "vuex";
import { CassetteState, TrackState } from "./types";
import { Actions } from "./actions";
import { Mutations } from "./mutations";
import { Getters } from "./getters";

export const CassetteModule: Module<CassetteState, object> = {
    state: {
        name: '',
        description: '',
        duration: 0,
        image: '',
        owner: {
            name: '',
            url: '',
            userIsOwner: false,
        },
        sides: [
            {
                duration: 0,
                length: 30,
                tracks: [],
            },
            {
                duration: 0,
                length: 30,
                tracks: [],
            },
        ],
    },
    actions: Actions,
    mutations: Mutations,
    getters: Getters
}
