import axios from "axios";
import { ActionTree } from "vuex"
import { AccountState } from "./types"
import { VueCookieNext } from 'vue-cookie-next'

const {
  VUE_APP_SPOTIFY_AUTH_URI,
  VUE_APP_CLIENT_ID,
  VUE_APP_CLIENT_SECRET,
  VUE_APP_SPOTIFY_ENDPOINT,
  VUE_APP_REDIRECT_URL,
} = process.env;

axios.interceptors.request.use(
  (config) => {
    return config
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if(error.response) {  
      const { status } = error.response;
      switch (status) {
        case 401:
          if (+VueCookieNext.getCookie('expires_at') < new Date().getTime()) {
            await refreshToken();
            error.config.headers.Authorization = `Bearer ${VueCookieNext.getCookie('access_token')}`;
            return await axios(error.config);
          }
          break;
        default:
          return Promise.reject(error);
      }
    }
  }
);

async function refreshToken() {
  const form = new URLSearchParams({
    refresh_token: VueCookieNext.getCookie('refresh_token'),
    grant_type: 'refresh_token',
  });

  await axios
  .post(VUE_APP_SPOTIFY_AUTH_URI + "/api/token", form, {
    headers: {
      Authorization: `Basic ${btoa(
        `${VUE_APP_CLIENT_ID}:${VUE_APP_CLIENT_SECRET}`
      )}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  .catch((err) => {
    return Promise.reject(err);
  })
  .then((response) => {
    VueCookieNext.setCookie('access_token', response.data.access_token, {expire: `${response.data.expires_in}s`} );
    const expiry = new Date().getTime() + (response.data.expires_in * 1000);
    VueCookieNext.setCookie('expires_at', String(expiry));
  });
}

export const Actions: ActionTree<AccountState, object> = {
  async Authorize(_, { code }) {
    const form = new URLSearchParams({
      code: code,
      redirect_uri: String(VUE_APP_REDIRECT_URL),
      grant_type: "authorization_code",
    });

    await axios
      .post(VUE_APP_SPOTIFY_AUTH_URI + "/api/token", form, {
        headers: {
          Authorization: `Basic ${btoa(
            `${VUE_APP_CLIENT_ID}:${VUE_APP_CLIENT_SECRET}`
          )}`,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .then((response) => {
        VueCookieNext.setCookie('access_token', response.data.access_token, {expire: `${response.data.expires_in}s`} );
        VueCookieNext.setCookie('refresh_token',  response.data.refresh_token, {expire: `${response.data.expires_in}s`} );
        const expiry = new Date().getTime() + (response.data.expires_in * 1000);
        VueCookieNext.setCookie('expires_at', String(expiry))
      });
  },

  async FetchUserProfile() {
    await axios
      .get(VUE_APP_SPOTIFY_ENDPOINT + "/me", {
        headers: {
          Authorization: `Bearer ${VueCookieNext.getCookie('access_token')}`,
          Accept: "application/json",
        },
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .then((response) => {
        VueCookieNext.setCookie('user_name',  response.data.display_name);
        VueCookieNext.setCookie('user_image_url',  response.data.images[0]?.url);
        VueCookieNext.setCookie('user_uri',  response.data.uri);
      });
  },

  async Logout(): Promise<void> {
    VueCookieNext.keys().forEach((key) => {
      VueCookieNext.removeCookie(key);
    });
    return Promise.resolve();
  },
}
