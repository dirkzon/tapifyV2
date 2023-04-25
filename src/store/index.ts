import { createStore } from 'vuex'
import { accountModule } from './Account'

export default createStore({
  state: {},  
  modules: {
    accountMod: accountModule
  }
})
