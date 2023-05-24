<template>
    <v-row 
      v-for="side in cassette.sides" 
      class="list-group-item"
      :key="side.uri">
        <CassetteSide v-bind:side="side"></CassetteSide>
    </v-row>
  </template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import CassetteSide from '@/components/CassetteSide.vue';

export default defineComponent({
  name: 'CassetteView',
  components: {
    CassetteSide,
  },
  async mounted() {
    await this.$store.dispatch("GetPlaylistTracks", this.$route.params.id);
    await this.$store.dispatch("GetAudioFeatures");
    await this.$store.dispatch("SortSides");
  },
  computed: {
      cassette() {
          return this.$store.getters.GetCassette;
      }
  }
});
</script>
  