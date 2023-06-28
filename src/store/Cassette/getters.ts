import { GetterTree } from "vuex";
import { CassetteState } from "./types";
import lodash from "lodash";

export const Getters: GetterTree<CassetteState, object> = {
    GetCassette(state) {
        return state;
    },

    getCassetteSideTracks: (state) => (index: number) => {
        return state.sides[index].tracks;
    },

    getCassetteSideDuration: (state) => (index: number) => {
        return state.sides[index].duration;
    },

    getCassetteMaxDuration: (state) => {
        const tracks = lodash.flatMap(state.sides, (side) => side.tracks);
        return lodash.maxBy(tracks, (track) => track.duration)?.duration;
    },

    getCassetteMinDuration: (state) => {
        const tracks = lodash.flatMap(state.sides, (side) => side.tracks);
        return lodash.minBy(tracks, (track) => track.duration)?.duration;
    },

    getPlayingTrack: (state) => {
        let playingTrack = null;
        state.sides.forEach(side => {
            side.tracks.forEach(track => {
                if(track.previewPlaying) {
                    playingTrack = track
                }
            });
        });
        return playingTrack;
    }
}
