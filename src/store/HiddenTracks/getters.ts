import { GetterTree } from "vuex";
import { TrackState } from "../Cassette/types";

export const Getters: GetterTree<Array<TrackState>, object> = {
    GetHiddenTracks(state) {
        return state;
    },
}
