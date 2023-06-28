import { ActionTree } from "vuex";
import { TrackState } from "../Cassette/types";

export const Actions: ActionTree<Array<TrackState>, object> = {
    UpdateHiddenTracks({commit}, tracks:Array<TrackState>) {
        commit("SET_HIDDEN_TRACKS", tracks);
    },
}