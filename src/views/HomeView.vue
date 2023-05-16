<template>
  <div>
      <a>{{ userPlaylists}}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  async mounted() {
    await this.$store.dispatch("getUsersPlaylists");
  },
  computed: {
    userPlaylists() {
      return this.$store.getters.getUsersPlaylists;
    }
  }
});
</script>
