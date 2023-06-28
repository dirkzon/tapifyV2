<template>
    <v-list-item v-if="trackPlaying" lines="one">
        <template v-slot:prepend>
            <v-avatar
                size="40"
                rounded="0"
                tile="true">
                    <v-img 
                    :src="playingTrack.image"> 
                    </v-img>
            </v-avatar>
        </template>
        <v-list-item-title v-text="playingTrack.name"></v-list-item-title>
        <v-list-item-subtitle v-text="playingTrack.artists.join('; ')"></v-list-item-subtitle>
    </v-list-item>
    <v-list-item lines="one" v-if="trackPlaying" class="d-flex justify-center" justify="space-around">
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
    </v-list-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MediaControls',
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
        }
    }
  })
</script>