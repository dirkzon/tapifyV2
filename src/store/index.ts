import { createStore } from 'vuex'
import { AccountModule } from './Account'
import { PlaylistModule } from './Playlist'

export default createStore({
  state: {},  
  modules: {
    accountModule: AccountModule,
    playlistModule: PlaylistModule,
  }
})
