<template>
  <v-container fluid fill-height>
    <v-row   
        align="start"
        justify="center">
      <v-col  
          cols="5"
          class="d-flex" 
          style="flex-direction:column">
        <v-card class="pa-3 ma-3">
          <v-card-title>Your playlists</v-card-title>
            <v-col 
              v-for="item in userPlaylists" 
              :key="item.uri" 
              :cols="item.flex">
                <PlaylistThumbnail v-bind:playlist="item"></PlaylistThumbnail>
                <v-divider></v-divider>
            </v-col>
        </v-card>
      </v-col>
      <v-col  
          cols="5"
          class="d-flex" 
          style="flex-direction:column">
        <v-card class="pa-3 ma-3">
          <v-card-title>Search playlists</v-card-title>
          <v-text-field
            @input="searchPlaylists"
            v-model="searchQuery"></v-text-field>
            <v-col 
              v-for="item in searchedPlaylists" 
              :key="item.uri" 
              :cols="item.flex">
                <PlaylistThumbnail v-bind:playlist="item"></PlaylistThumbnail>
                <v-divider></v-divider>
            </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlaylistThumbnail  from "./../components/Playlist.vue";

export default defineComponent({
  name: 'HomeView',
  data() {
    return {
      searchQuery: ''
    }
  },
  components: {
    PlaylistThumbnail,
  },
  async mounted() {
    await this.$store.dispatch("getUsersPlaylists");
  },
  computed: {
    userPlaylists() {
      return this.$store.getters.getUsersPlaylists;
    },
    searchedPlaylists() {
      return this.$store.getters.getSearchedPlaylists;
    },
  },
  methods: {
    searchPlaylists() {
      if(this.searchQuery != null)
      this.$store.dispatch("searchPlaylists", this.searchQuery);
    }
  }
});
</script>
