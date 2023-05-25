import { GetterTree } from "vuex";
import { CassetteState } from "./types";

export const Getters: GetterTree<CassetteState, object> = {
    GetCassette(state) {
        return state;
    },

    getCassetteSideTracks: (state) => (index: number) => {
        return state.sides[index].tracks;
    },
}
