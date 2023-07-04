import { ActionTree } from "vuex";
import { PlaylistsState } from "./types";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";

const { VUE_APP_SPOTIFY_ENDPOINT } = process.env;

export const Actions: ActionTree<PlaylistsState, object> = {
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
            commit("EMPTY_USERS_PLAYLISTS");
            response["data"].items.forEach((item: object) => {
              commit("SET_USERS_PLAYLISTS", item);
            });
          }
        });
    },

    async searchPlaylists({commit}, query: string): Promise<void> {
      await axios
      .get(`${VUE_APP_SPOTIFY_ENDPOINT}/search?q=${query}&type=playlist&limit=10` , {
        headers: {
          Authorization: `Bearer ${VueCookieNext.getCookie('access_token')}`,
          Accept: "application/json",
        },
      })
      .catch((err) => {
        console.log(err);
      })
      .then((response: any) => {
        console.log(response)
        if (response) {
          commit("EMPTY_SEARCHED_PLAYLISTS");
          response['data'].playlists.items.forEach((item: object) => {
            commit("SET_SEARCHED_PLAYLISTS", item);
          });
        }
      });
    }
}