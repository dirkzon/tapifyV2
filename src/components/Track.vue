<template>
    <v-card>
        {{ track.name }}
    </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CassetteTrack',
  props: ["track"],
})
</script>