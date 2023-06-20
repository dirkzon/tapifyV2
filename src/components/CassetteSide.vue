<template>
    <v-card class="pa-10">
      <v-row>
        <v-col>
          <v-card-title v-text="`${String.fromCharCode(97 + sideIndex)}-side`"> </v-card-title>
        </v-col>
        <v-col>
          <v-card-subtitle v-text="`${duration.getMinutes()}:${duration.getSeconds().toString().padStart(2, '0')}`"></v-card-subtitle>
        </v-col>
        <v-col cols="auto">
          <v-btn icon small @click="DeleteSide" v-if="sideIndex != 0">
              <v-icon>
                  mdi-delete-forever
              </v-icon>
            </v-btn>
        </v-col>
      </v-row>
          <draggable 
            v-model="tracks" 
            :group="`tracks`"
            item-key="id">
              <template #item="{element}">
                <Track v-bind:track="element"></Track>
              </template>
          </draggable>
    </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import Track from '@/components/Track.vue'

export default defineComponent({
  name: 'CassetteSide',
  props: ["sideIndex"],
  components: {
    draggable,
    Track,
  },
  computed: {
    tracks: {
      get() {
        return this.$store.getters.getCassetteSideTracks(this.sideIndex);
      },
      set() {
        console.log('');
      },
    },
    duration(): Date {
      return new Date(this.$store.getters.getCassetteSideDuration(this.sideIndex));
    },
  },
  methods: {
    DeleteSide: function () {
      this.$store.dispatch('DeleteCassetteSide',this.sideIndex);
    },
    SetHidden: function (trackId: string) {
      this.$store.dispatch('SetHiddenState', trackId);
    },
  }
})
</script>