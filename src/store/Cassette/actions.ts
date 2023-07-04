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
      .then((response: any) => {
        console.log(response)
        const userId = VueCookieNext.getCookie('user_id');
        commit("SET_CASSETTE_METADATA", { metadata: response.data, userIsOwner: (userId == response.data.owner.id) });
          response.data.tracks.items.forEach((item: any) => {
            const newTrack: TrackState = {
              name: item.track.name,
              image: item.track.album.images[0].url,
              id: item.track.id,
              duration: item.track.duration_ms,
              artists: [],
              locked: false,
              preview: item.track.preview_url ? new Audio(item.track.preview_url) : null,
              previewPlaying: false,
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
      for (let i = 0; i < tracks.length; i++) {
        commit("SET_TRACK_LOCKED", { trackIndex: i, sideIndex: sideIndex, lockedState: false });
        commit("ADD_TRACK_TO_SIDE", { sideIndex: 0, track: tracks[i] });
      }
      commit("REMOVE_SIDE", sideIndex);
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {sideIndex: i, side: sides[i]});
      }
    }
  },

  SetHiddenState({ commit, state }, {trackId, hiddenState}) {
    const [side, track] = GetTrackSideAndPositionIndex(state.sides, trackId);
    if (track >= 0) {
      commit("SET_TRACK_HIDDEN", { trackIndex: track, sideIndex: side, hiddenState: hiddenState });
    }
    const sides = SortSides(state.sides);
    for (let i = 0; i < sides.length; i++) {
      commit("SET_SIDE", {sideIndex: i, side: sides[i]});
    }
  },

  SetLockedState({commit, state}, {trackId, lockState}) {
    const [side, track] = GetTrackSideAndPositionIndex(state.sides, trackId);
    if (track >= 0) {
      commit("SET_TRACK_LOCKED", { trackIndex: track, sideIndex: side, lockedState: lockState });
      const sides = SortSides(state.sides);
      for (let i = 0; i < sides.length; i++) {
        commit("SET_SIDE", {sideIndex: i, side: sides[i]});
      }
    }
  },

  UpdateSide({commit, state}, {tracks, sideIndex}) {
    const side = {
      ...state.sides[sideIndex],
      tracks: tracks
    }
    commit("SET_SIDE", {sideIndex, side});
  },

  PlayPreview({state, dispatch}, trackId) {
    const [sideIndex, trackIndex] = GetTrackSideAndPositionIndex(state.sides, trackId);
    const track = state.sides[sideIndex].tracks[trackIndex];
    if(track.previewPlaying) {
      dispatch('StopAllPreviews')
    } else {
      dispatch('StopAllPreviews')
      track.previewPlaying = true;
      track.preview.play();
      track.preview.onended = function() {
        track.previewPlaying = false;
        track.preview.pause()
        track.preview.currentTime = 0;
      }
    }
  },

  StopAllPreviews({state}) {
    state.sides.forEach(side => {
      side.tracks.forEach(track => {
        if(track.preview != null) {
          track.previewPlaying = false;
          track.preview.pause()
          track.preview.currentTime = 0;
        }
      })
    })
  },

  PlayNextPreview({state, dispatch}, trackId) {
    dispatch('PlayPreview', trackId)
    const [sideIndex, trackIndex] = GetTrackSideAndPositionIndex(state.sides, trackId);

    let nextTrackIndex = trackIndex;
    let nextSideIndex = sideIndex
    do {
      nextTrackIndex++;
      if(nextTrackIndex == state.sides[sideIndex].tracks.length) {
        nextTrackIndex = 0;
        nextSideIndex++
        if(nextSideIndex == state.sides.length) {
          nextSideIndex = 0;
        }
      } 
    } while(state.sides[nextSideIndex].tracks[nextTrackIndex].preview == null)

    const nextTrackId = state.sides[nextSideIndex].tracks[nextTrackIndex].id;
    dispatch('PlayPreview', nextTrackId)
  },

  PlayPreviousPreview({state, dispatch}, trackId) {
    const [sideIndex, trackIndex] = GetTrackSideAndPositionIndex(state.sides, trackId);
    dispatch('PlayPreview', trackId)

    let previousTrackIndex = trackIndex;
    let previousSideIndex = sideIndex
    do {
      previousTrackIndex--;
      if(previousTrackIndex < 0) {
        previousSideIndex--
        if(previousSideIndex < 0) {
          previousSideIndex = state.sides.length - 1
        } 
        previousTrackIndex = state.sides[previousSideIndex].tracks.length - 1
      } 
    } while(state.sides[previousSideIndex].tracks[previousTrackIndex].preview == null)

    const previousTrackId = state.sides[previousSideIndex].tracks[previousTrackIndex].id;
    dispatch('PlayPreview', previousTrackId);
  },

    SetCassetteLength({commit}, {sideIndex, newLength}) {
      commit('SET_SIDE_LENGTH', {sideIndex, newLength})
  }
}
