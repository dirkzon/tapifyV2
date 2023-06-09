import { createStore } from 'vuex'
import { AccountModule } from './Account'
import { PlaylistModule } from './Playlist'
import { CassetteModule } from './Cassette'
import { HiddenTracksModule } from './HiddenTracks'

export default createStore({
  state: {},  
  modules: {
    accountModule: AccountModule,
    playlistModule: PlaylistModule,
    cassetteModule: CassetteModule,
    hiddenTracksModule: HiddenTracksModule,
  }
})
