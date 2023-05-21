import { ActionTree } from "vuex";
import { CassetteState } from "./types";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";
import { SortSides } from "./service";

const { VUE_APP_SPOTIFY_ENDPOINT } = process.env;

export const Actions: ActionTree<CassetteState, object> = {
    async GetPlaylistTracks({commit}, playlistId: string) {
        await axios
        .get(`${VUE_APP_SPOTIFY_ENDPOINT}/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${VueCookieNext.getCookie('access_token')}`,
            Accept: "application/json",
          },
        })
        .catch((err) => {
          console.log(err);
          throw new Error(err);
        })
        .then((response) => {
            response.data.tracks.items.forEach((item: { track: object; }) => {
                commit("ADD_TRACK_TO_SIDE", { index:0, track: item.track });
            });
        });
    },

    SortSides({commit, state}) {
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {index: i, side: sides[i]});
      }
    }
}