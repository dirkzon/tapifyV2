<template>
  <div>
    <v-row>
      <h2 class="mt-auto mb-auto mr-2 ml-2">{{ name }}</h2>
      <v-avatar
        size="50">
        <img
          height="50"
          :alt="name"
          :src="image"
        >
      </v-avatar>
      <v-icon
        x-large
        class="mt-auto mb-auto ma-4 float-right"
        @click="logout()"
        > mdi-logout
      </v-icon>
    </v-row>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'

export default defineComponent({
  name: 'accountComponent',
  computed: {
    name(): string {
      return VueCookieNext.getCookie('user_name');
    },
    image(): string {
      return VueCookieNext.getCookie('user_image_url');
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("Logout")
      .then(async () => await this.$router.push({name: 'login'}));
    }
  }
})
</script>
