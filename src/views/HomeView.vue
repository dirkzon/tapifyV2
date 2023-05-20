<template>
  <div>
    <v-col 
      md="4"
      offset-md="4"
      v-for="item in userPlaylists" 
      :key="item.uri" 
      :cols="item.flex">
        <PlaylistThumbnail v-bind:playlist="item"></PlaylistThumbnail>
    </v-col>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlaylistThumbnail  from "./../components/Playlist.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    PlaylistThumbnail,
  },
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
