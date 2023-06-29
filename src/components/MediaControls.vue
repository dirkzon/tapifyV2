<template>
     <v-list-item lines="one" v-if="trackPlaying" class="d-flex justify-center" justify="space-around">
        <template v-slot:prepend>
            <v-avatar
                size="60"
                rounded="0"
                tile="true">
                    <v-img 
                    :src="playingTrack.image"> 
                    </v-img>
            </v-avatar>
        </template>
        <v-col>
            <v-row>
                <v-list-item-title v-text="playingTrack.name"></v-list-item-title>
            </v-row>
            <v-row>
                <v-btn-group>
                    <v-btn
                        @click="playPrevious"
                        variant="text"
                        icon="mdi-skip-previous"
                    ></v-btn>
                    <v-btn
                        @click="playPreview"
                        variant="text"
                        :icon="playingTrack.previewPlaying ? 'mdi-pause' : 'mdi-play'"
                    ></v-btn>
                    <v-btn
                        @click="playNext"
                        variant="text"
                        icon="mdi-skip-next"
                    ></v-btn>
                </v-btn-group>
            </v-row>
        </v-col>
    </v-list-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MediaControls',
  created() {
    window.addEventListener("keydown", this.handleKeyEvent);
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleKeyEvent);
  },
  computed: {
        playingTrack() {
            return this.$store.getters.getPlayingTrack;
        },
        trackPlaying() {
            return this.$store.getters.getPlayingTrack != null
        }
    },
    methods: {
        playPreview: function() {
            this.$store.dispatch("PlayPreview", this.playingTrack.id);
        },
        playNext: function() {
            this.$store.dispatch("PlayNextPreview", this.playingTrack.id);
        },
        playPrevious: function() {
            this.$store.dispatch("PlayPreviousPreview", this.playingTrack.id);
        },
        handleKeyEvent: function(event: any) {
            if(this.trackPlaying) {
                if(event.key == 'ArrowRight' || event.key == 'MediaTrackNext') {
                    this.$store.dispatch("PlayNextPreview", this.playingTrack.id);
                }
                if(event.key == 'ArrowLeft' || event.key == 'MediaTrackPrevious') {
                    this.$store.dispatch("PlayPreviousPreview", this.playingTrack.id);
                }
                // if(event.key == 'MediaPlayPause') {
                //     this.$store.dispatch("PlayPreview", this.playingTrack.id);
                // }
            }
        },
    }
  })
</script>