import { MutationTree } from "vuex";
import { CassetteState } from "./types";
import { getTrackeById } from "./service";

export const Mutations: MutationTree<CassetteState> = {
    ADD_TRACK_TO_SIDE(state, { index, track }) {
        state.sides[index].tracks.push(track)
        state.sides[index].duration += track.duration
        state.duration += track.duration;
    },

    SET_SIDE(state, { index, side }) {
        state.sides[index] = side;
    },

    REMOVE_SIDE(state, index) {
        state.sides.splice(index, 1)
    },

    SET_AUDIO_FEATURE_ON_TRACK(state, audio_features) {
        const track = getTrackeById(state.sides, audio_features.id);
        if (track != null) {
            track.danceability = audio_features.danceability;
            track.energy = audio_features.energy;
            track.instrumentalness = audio_features.instrumentalness;
            track.liveness = audio_features.liveness;
            track.tempo = audio_features.tempo;
        }
    },

    CLEAR_SIDES(state) {
        state.sides.forEach((side) => {
            side.tracks = [];
            side.duration = 0;
        });
        state.duration = 0;
    },
    
    RESET_SIDE_COUNT(state) {
        state.sides.splice(1, state.sides.length - 2)
    },

    ADD_SIDE(state) {
        state.sides.push({
           duration: 0,
           tracks: [], 
        })
    }
}