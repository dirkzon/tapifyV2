<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="auto">
        <v-btn density="comfortable" v-text="`add side`" @click="addSide"></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col 
      md="4"
      :key="n" v-for="n in sidesCount">
            <CassetteSide v-bind:sideIndex="n - 1"></CassetteSide>
      </v-col>
   </v-row>  
  </div>
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
    await this.$store.dispatch("ResetCassette");
    await this.$store.dispatch("GetPlaylistTracks", this.$route.params.id);
    await this.$store.dispatch("GetAudioFeatures");
    await this.$store.dispatch("SortSides");
  },
  computed: {
      cassette() {
          return this.$store.getters.GetCassette;
      },
      sidesCount() {
        return this.$store.getters.GetCassette.sides.length;
      },
  },
  methods: {
    addSide: function () {
      this.$store.dispatch("AddCassetteSide");
    }
  }
});
</script>
  