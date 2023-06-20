<template>  
  <div>
    <v-card flat>
      <v-row no-gutters justify="start">
        <v-col xs="12" sm="3" md="6" lg="3" cols="2">
            <v-img 
              :src="track.image" 
              :width="track.duration / 2000"
              min-width="50"
              max-width="120"
              class="ma-1"
            ></v-img>
        </v-col>
        <v-col xs="12" sm="7" md="6" lg="7">
          <v-card-title v-text="track.name"></v-card-title>
          <v-card-subtitle v-text="track.artists.join('; ')"></v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CassetteTrack',
  props: ["track"],
})
</script>

  <!-- <v-card tile :disabled="track.hidden" flat  :height="50">
    <v-row style="margin: 1px" :height="50">
      <v-col>
        <v-img 
          :src="track.image" 
          aspect-ratio="1"
          height="auto"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
  <v-divider></v-divider> -->
