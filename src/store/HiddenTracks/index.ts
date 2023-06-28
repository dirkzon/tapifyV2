import { Module } from "vuex";
import { TrackState } from "../Cassette/types";
import { Actions } from "./actions";
import { Mutations } from "./mutations";
import { Getters } from "./getters";

export const HiddenTracksModule: Module<Array<TrackState>, object> = {
    state: [],
    actions: Actions,
    mutations: Mutations,
    getters: Getters,
}