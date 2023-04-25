<template>
  <v-app>
    <v-main>
      <v-toolbar v-if="loggedIn"> 
          <v-container>  
            <h1 class="float-right">TAPIFY</h1>
          </v-container>
          <v-container>  
            <accountComponent class="float-right"> </accountComponent>
          </v-container>
      </v-toolbar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'
import  accountComponent from '@/components/Account.vue';

export default defineComponent({
  name: 'App',
  components: {
    accountComponent,
  },
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
        this.loggedIn = false;
        this.$router.push({ name: 'login' });
      }
    }
  },
});
</script>
