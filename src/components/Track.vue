<template>  
  <v-list-item
    link
    color="primary"
    rounded
    density="compact">
    <template v-slot:prepend>
      <v-hover v-slot="{ isHovering, props }">
        <v-avatar
            :size="imageWidth"
            rounded="0"
            tile="true">
            <v-img 
              aspect-ratio="1"
              cover
              :src="track.image"
              v-bind="props">
                <v-btn
                  rounded="0"
                  :style="{ 'background-color': 'rgba(0, 0, 0, 0.4)' }"
                  :height="imageWidth"
                  :width="imageWidth"
                  v-if="isHovering || thisTrackPlaying && previewAvailable"
                  @click="playPreview"
                  :disabled="!previewAvailable"
                  variant="text"
                  color="white"
                  :icon="track.previewPlaying ? 'mdi-pause' : 'mdi-play'"
                ></v-btn>
            </v-img>
        </v-avatar>
      </v-hover>
    </template>
    <v-list-item-title v-text="track.name"></v-list-item-title>
    <v-list-item-subtitle v-text="track.artists.join('; ')"></v-list-item-subtitle>
    <template v-slot:append>
      <v-btn-group>
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
    thisTrackPlaying() {
      const playingTrack = this.$store.getters.getPlayingTrack
      return playingTrack != null && playingTrack.id == this.track.id
    },
    previewAvailable() {
      return this.track.preview != null;
    }
  }
});
</script>
