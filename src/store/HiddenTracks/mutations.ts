import { MutationTree } from "vuex";
import { TrackState } from "../Cassette/types";

export const Mutations: MutationTree<Array<TrackState>> = {
    SET_HIDDEN_TRACKS(state, tracks) {
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].locked = false;
            if(tracks[i].preview != null) {
                tracks[i].previewPlaying = false;
                tracks[i].preview.pause()
                tracks[i].preview.currentTime = 0;
            }
            state[i] = tracks[i]
        }
    },

    CLEAR_HIDDEN_TRACKS(state) {
        state.splice(0, state.length);
    }
}
