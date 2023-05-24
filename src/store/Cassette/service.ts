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

export function getTrackeById(sides: Array<CassetteSideState>, trackId: string): TrackState | null {
  let track = null;
  sides.forEach((side: CassetteSideState) => {
    const index = side.tracks.findIndex((track) => track.id === trackId);
    if(index >= 0) {
        track = side.tracks[index]; 
    } 
  });
  return track;
}
