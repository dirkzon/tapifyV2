<template>
  <v-app>
    <v-main>
      <v-toolbar v-if="loggedIn"> 
        <v-spacer></v-spacer>
        <h1>{{ name }}</h1>
        <v-avatar 
          color="red" 
          size="50">
          <v-img
            size="50"
            :alt="name"
            :src="image"
          ></v-img>
        </v-avatar>
      </v-toolbar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'

export default defineComponent({
  name: 'App',
  data() {
    return {
      loggedIn: false,
    }
  },
  watch:{
    $route() {
      if (VueCookieNext.getCookie('access_token') != null) {
        this.loggedIn = true
      } else {
        this.$router.push({ name: 'login' });
      }
    }
  },
  computed: {
    name(): string {
      return VueCookieNext.getCookie('user_name');
    },
    image(): string {
      return VueCookieNext.getCookie('user_image_url');
    },
  }
});
</script>
