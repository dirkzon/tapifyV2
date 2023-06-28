<template>
    <v-list-item>
        <template v-slot:prepend>
            <v-avatar
                size="45"
                rounded="0"
                tile="true">
                <v-img 
                    :src="track.image"> 
                </v-img>
            </v-avatar>
        </template>
        <v-list-item-title v-text="track.name"></v-list-item-title>
    </v-list-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HoldTrack',
  props: ["track"],
  })
</script>