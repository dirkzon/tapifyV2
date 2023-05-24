<template>
    <v-card class="pa-10">
        <v-col 
            md="4"
            offset-md="4"
            v-for="track in side.tracks" 
            :key="track.id" 
            :cols="track.flex">
                <CassetteTrack v-bind:track="track"></CassetteTrack>
        </v-col>
    </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import CassetteTrack from '@/components/Track.vue'

export default defineComponent({
  name: 'CassetteSide',
  props: ["side"],
  components: {
    CassetteTrack,
  }
})
</script>