import { ActionTree } from "vuex";
import { CassetteState, TrackState } from "./types";
import axios from "axios";
import { VueCookieNext } from "vue-cookie-next";
import { GetTrackSideAndPositionIndex, SortSides } from "./service";

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
                commit("ADD_TRACK_TO_SIDE", { sideIndex: 0, track: newTrack });
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
        let trackIndex = 0;
        response.data.audio_features.forEach((features: object) => {
          commit("SET_AUDIO_FEATURE_ON_TRACK", {trackIndex: trackIndex, sideIndex: 0, audio_features: features});
          trackIndex++;
        });
      });
    },

    AddCassetteSide({commit, state}) {
      commit("ADD_SIDE");
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {sideIndex: i, side: sides[i]});
      }
    },

    SortSides({commit, state}) {
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {sideIndex: i, side: sides[i]});
      }
    },

    ResetCassette({commit}) {
      commit("CLEAR_SIDES");
      commit("RESET_SIDE_COUNT")
    },

    DeleteCassetteSide({commit, state}, sideIndex) {
      if(state.sides.length > 1 && sideIndex > 0) {
        const tracks = state.sides[sideIndex].tracks
        tracks.forEach(track => {
          commit("ADD_TRACK_TO_SIDE", { sideIndex: 0, track: track });
        })
        commit("REMOVE_SIDE", sideIndex);
        const sides = SortSides(state.sides);
        for (let i = 0; i < sides.length; i++) {
          commit("SET_SIDE", {sideIndex: i, side: sides[i]});
        }
      }
    },

    SetHiddenState({ commit, state },trackId) {
      const [side, track] = GetTrackSideAndPositionIndex(state.sides, trackId);
      if (track >= 0) {
        const hiddenState = state.sides[side].tracks[track].hidden
        commit("SET_TRACK_HIDDEN", { trackIndex: track, sideIndex: side, hiddenState: !hiddenState });
      }
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {sideIndex: i, side: sides[i]});
      }
    },
}
