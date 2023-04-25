import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { VueCookieNext } from 'vue-cookie-next'

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueCookieNext)
  .mount('#app');

VueCookieNext.config({ expire: '7d' });
