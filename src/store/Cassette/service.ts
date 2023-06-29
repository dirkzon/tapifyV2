import lodash from "lodash";
import { CassetteSideState, TrackState } from "./types";

export function SortSides(sides: Array<CassetteSideState>): Array<CassetteSideState> {
    const tracks = lodash.flatMap(sides, (side) => side.tracks);
    const sortableTracks = lodash.filter(tracks, (track: TrackState) => !track.locked)
    const durationSort = lodash.sortBy(sortableTracks, (track) => track.duration).reverse();

    const sortedsides: Array<CassetteSideState> = new Array<CassetteSideState>();
    for (let i = 0; i < sides.length; i++) {
      const lockedTracks = lodash.filter(sides[i].tracks, (track: TrackState) => track.locked);
      sortedsides.push({
        tracks: [], 
        length: 30,
        duration: lodash.sumBy(lockedTracks, (track) => track.duration),
      });
    }

    durationSort.forEach((track: TrackState) => {
      const shortestSide = lodash.sortBy(sortedsides, (side) => side.duration)[0];
      shortestSide.tracks.push(track);
      shortestSide.duration += track.duration;
    });

    for (let i = 0; i < sides.length; i++) {
      for (let k = 0; k < sides[i].tracks.length; k++) {
        if(sides[i].tracks[k].locked) {
          let insertIndex = k;
          if(k > sortedsides[i].tracks.length) {
            insertIndex = sortedsides[i].tracks.length;
          }
          sortedsides[i].tracks.splice(insertIndex, 0, sides[i].tracks[k]);
        }
      }
    }
    return sortedsides;
}

export function GetTrackSideAndPositionIndex(sides: Array<CassetteSideState>, trackId: string): number[] {
  let sideTrackIndex = [-1, -1];
  for (let i = 0; i < sides.length; i++) {
    const trackIndex = sides[i].tracks.findIndex((track: TrackState) => track.id === trackId);
    if(trackIndex >= 0) {
      sideTrackIndex = [i, trackIndex];
    }
  }
  return sideTrackIndex;
}
