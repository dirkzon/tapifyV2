import { ActionTree } from "vuex";
import { CassetteState, TrackState } from "./types";
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
            response.data.tracks.items.forEach((item: any) => {
              const newTrack: TrackState = {
                name: item.track.name,
                image: item.track.album.images[0].url,
                id: item.track.id,
                duration: item.track.duration_ms,
                artists: [],
                locked: false,
                hidden: false
                }
                item.track.artists.forEach((artist: { name: string; }) => {
                    newTrack.artists.push(artist.name)
                });
                commit("ADD_TRACK_TO_SIDE", { index:0, track: newTrack });
            });
        });
    },

    async GetAudioFeatures({commit, state}) {
      const trackIds = state.sides.map((side) => side.tracks.map((track) => track.id)).flat().join(",");
      await axios
      .get(`${VUE_APP_SPOTIFY_ENDPOINT}/audio-features?ids=${trackIds}`, {
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
        response.data.audio_features.forEach((item: object) => {
          commit("SET_AUDIO_FEATURE_ON_TRACK", item);
        });
      });
    },

    AddCassetteSide({commit, state}) {
      commit("ADD_SIDE");
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {index: i, side: sides[i]});
      }
    },

    SortSides({commit, state}) {
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {index: i, side: sides[i]});
      }
    },

    ResetCassette({commit}) {
      commit("CLEAR_SIDES");
      commit("RESET_SIDE_COUNT")
    },

    DeleteSide({commit, state}, sideIndex) {
      if(state.sides.length > 1 && sideIndex > 0) {
        const tracks = state.sides[sideIndex].tracks
        tracks.forEach(track => {
          commit("ADD_TRACK_TO_SIDE", { index:0, track: track });
        })
        commit("REMOVE_SIDE", sideIndex);
        const sides = SortSides(state.sides);
        for (let i = 0; i < sides.length; i++) {
          commit("SET_SIDE", {index: i, side: sides[i]});
        }
      }
    }
}