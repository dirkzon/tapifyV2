import { MutationTree } from "vuex";
import { CassetteState } from "./types";

export const Mutations: MutationTree<CassetteState> = {
    SET_CASSETTE_METADATA(state, {metadata, userIsOwner}) {
        state.name = metadata.name;
        state.description = metadata.description;
        state.image = metadata.images[0].url;
        state.owner.name = metadata.owner.display_name;
        state.owner.url = metadata.owner.href;
        state.owner.userIsOwner = userIsOwner;
    },

    ADD_TRACK_TO_SIDE(state, { sideIndex, track }) {
        state.sides[sideIndex].tracks.push(track)
        state.sides[sideIndex].duration += track.duration
        state.duration += track.duration;
    },

    SET_SIDE(state, { sideIndex, side }) {
        state.sides[sideIndex] = side;
    },

    REMOVE_SIDE(state, sideIndex) {
        state.sides.splice(sideIndex, 1)
    },

    SET_AUDIO_FEATURE_ON_TRACK(state, {trackIndex, sideIndex, audio_features}) {
        const track = state.sides[sideIndex].tracks[trackIndex];
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
           length: 30,
           tracks: [], 
        })
    },

    SET_TRACK_LOCKED(state, { trackIndex, sideIndex, lockedState }) {
        state.sides[sideIndex].tracks[trackIndex].locked = lockedState;
    },

    SET_SIDE_LENGTH(state, {sideIndex, newLength}) {
        state.sides[sideIndex].length = newLength;
    },
}