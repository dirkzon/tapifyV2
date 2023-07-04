<template>
    <v-list-item
        link
        @click="SelectPlaylist">
        <template v-slot:prepend>
            <v-avatar
                size="75"
                rounded="0"
                tile="true">
                <v-img 
                    :src="playlist.image"> 
                </v-img>
            </v-avatar>
        </template>
        <v-list-item-title v-text="playlist.name"></v-list-item-title>
        <v-list-item-subtitle v-text="playlist.creator"></v-list-item-subtitle>
    </v-list-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlaylistThumbnail',
  props: ["playlist"],
  methods: {
    SelectPlaylist() {
        this.$router.push({ name: 'cassette', params: { id: this.playlist.id }});
    }
  }
})
</script>