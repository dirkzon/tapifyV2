import lodash from "lodash";
import { CassetteSideState, TrackState } from "./types";

export function SortSides(sides: Array<CassetteSideState>): Array<CassetteSideState> {
    const tracks = lodash.flatMap(sides, (side) => side.tracks);
    const durationSort = lodash.sortBy(tracks, (track) => track.duration).reverse();

    const sortedsides: Array<CassetteSideState> = new Array<CassetteSideState>();
    sides.forEach(() => {
      sortedsides.push({tracks: [], duration: 0});
    })

    durationSort.forEach((track: TrackState) => {
      const shortestSide = lodash.sortBy(sortedsides, (side) => side.duration)[0];
      shortestSide.tracks.push(track);
      shortestSide.duration += track.duration;
    });
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
