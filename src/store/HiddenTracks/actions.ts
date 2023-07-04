import { ActionTree } from "vuex";
import { TrackState } from "../Cassette/types";

export const Actions: ActionTree<Array<TrackState>, object> = {
    UpdateHiddenTracks({commit}, tracks:Array<TrackState>) {
        commit("CLEAR_HIDDEN_TRACKS");
        commit("SET_HIDDEN_TRACKS", tracks);
    },

    ClearHiddenTracks({commit}) {
        commit("CLEAR_HIDDEN_TRACKS");
    },
}