<template>
    <v-card>
        <v-sheet class="d-flex">
            <v-sheet class="ma-2 pa-0 me-auto">
                <v-img
                    aspect-ratio="1:1"
                    height="150"
                    width="150"
                    :src="playlist.image"
                ></v-img>
            </v-sheet>
            <v-sheet class="ma-2 pa-2 ">
                <v-card-title v-text="playlist.name" class="text-h5"></v-card-title>
                <v-card-text v-text="playlist.creator"></v-card-text>
            </v-sheet>
            <v-sheet class="ma-2 pa-2">
                <v-btn-group>
                    <v-btn icon @click="click()" small>
                        <v-icon>
                            mdi-page-next
                        </v-icon>
                    </v-btn>
                    <v-btn icon :href="playlist.url" target="_blank" small>
                        <v-icon>
                            mdi-open-in-new 
                        </v-icon>
                    </v-btn>
                </v-btn-group>
            </v-sheet>
        </v-sheet>
    </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlaylistThumbnail',
  props: ["playlist"],
  methods: {
    click() {
        alert(this.playlist.id)
    }
  }
})
</script>