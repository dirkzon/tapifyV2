import { MutationTree } from "vuex";
import { CassetteState, TrackState } from "./types";

export const Mutations: MutationTree<CassetteState> = {
    ADD_TRACK_TO_SIDE(state, { index, track }) {
        const newTrack: TrackState = {
            name: track.name,
            id: track.id,
            duration: track.duration_ms,
            artists: [],
            locked: false,
            hidden: false
        }
        track.artists.forEach((artist: { name: string; }) => {
            newTrack.artists.push(artist.name)
        });
        state.sides[index].tracks.push(newTrack);
        state.sides[index].duration += newTrack.duration
        state.duration += newTrack.duration;
    },

    SET_SIDE(state, { index, side }) {
        state.sides[index] = side;
    },
}