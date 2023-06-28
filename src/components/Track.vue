<template>  
  <v-list-item
      color="blue">
    <template v-slot:prepend>
      <v-avatar
          :size="imageWidth"
          rounded="0"
          tile="true">
          <v-img 
              :src="track.image">
          </v-img>
      </v-avatar>
    </template>
    <v-list-item-title v-text="track.name"></v-list-item-title>
    <v-list-item-subtitle v-text="track.artists.join('; ')"></v-list-item-subtitle>
    <template v-slot:append>
      <v-btn-group>
        <v-btn
          @click="playPreview"
          :disabled="track.preview == null"
          variant="text"
          :icon="track.previewPlaying ? 'mdi-pause' : 'mdi-play'"
        ></v-btn>
        <v-btn
          @click="setLock"
          variant="text"
          :icon="track.locked ? 'mdi-lock' : 'mdi-lock-open-variant'"
        ></v-btn>
      </v-btn-group>
    </template>
  </v-list-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CassetteTrack',
  props: ["track"],
  methods: {
    setLock: function() {
      this.$store.dispatch("SetLockedState", {
          trackId: this.track.id,
          lockState: !this.track.locked,
      });
    },
    playPreview: function() {
      this.$store.dispatch("PlayPreview", this.track.id);
    },
  },
  computed:{
    imageWidth: function(): number {
      const max = this.$store.getters.getCassetteMaxDuration;
      const min = this.$store.getters.getCassetteMinDuration;
      return 40 + (90 - 40) * (this.track.duration - min) / (max - min);
    },
  }
});
</script>
