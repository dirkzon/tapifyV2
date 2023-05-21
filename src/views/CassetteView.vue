<template>
    <div>
      {{ cassette.sides }}
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CassetteView',
    async mounted() {
      await this.$store.dispatch("GetPlaylistTracks", this.$route.params.id);
      await this.$store.dispatch("SortSides");
    },
    computed: {
        cassette() {
            return this.$store.getters.GetCassette;
        }
    }
  });
  </script>
  