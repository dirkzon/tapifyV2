import { ActionTree } from "vuex";
import { PlaylistState } from "./types";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";

const { VUE_APP_SPOTIFY_ENDPOINT } = process.env;

export const Actions: ActionTree<[PlaylistState], object> = {
    async getUsersPlaylists({commit}): Promise<void> {
        await axios
          .get(VUE_APP_SPOTIFY_ENDPOINT + "/me/playlists", {
            headers: {
              Authorization: `Bearer ${VueCookieNext.getCookie('access_token')}`,
              Accept: "application/json",
            },
          })
          .catch((err) => {
            console.log(err);
          })
          .then((response) => {
            if (response) {
              commit("EMPTY_PLAYLISTS");
              response["data"].items.forEach((item: object) => {
                commit("SET_PLAYLIST", item);
              });
            }
          });
      },
}