<template>
    <v-card 
      class="ma-4 flex-grow-1"
      min-width="400px"
      max-width="800px">
      <v-card-actions class="ma-2">
        <v-card-title v-text="`${String.fromCharCode(97 + sideIndex)}-side`"> </v-card-title>
        <v-card-subtitle v-text="`${duration.getMinutes()}:${duration.getSeconds().toString().padStart(2, '0')}`"></v-card-subtitle>
        <v-spacer></v-spacer>
        <v-btn-group>
          <v-btn
            @click="addSide" 
            variant="text"
            icon="mdi-playlist-plus"
          ></v-btn>
          <v-btn
            @click="DeleteSide" 
            v-if="sideIndex != 0"
            variant="text"
            icon="mdi-playlist-remove"
          ></v-btn>
          <v-btn
            variant="text"
            icon="mdi-dots-vertical"
          ></v-btn>
        </v-btn-group>
      </v-card-actions>
      <v-list class="pa-2" lines="two">
        <draggable 
        @change="lockTrack"
        v-model="tracks" 
        item-key="id"
        v-bind="dragOptions">
          <template #item="{element}">
            <div>
              <Track v-bind:track="element"></Track>
              <v-divider></v-divider>
            </div>
          </template>
      </draggable>
      </v-list>
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
      set(value: any) {
        this.$store.dispatch("UpdateSide", {
          tracks: value,
          sideIndex: this.sideIndex,
        });
      },
    },
    duration(): Date {
      return new Date(this.$store.getters.getCassetteSideDuration(this.sideIndex));
    },
    dragOptions() {
      return {
        animation: 150,
        group: "tracks",
        disabled: false,
      };
    },
  },
  methods: {
    DeleteSide: function () {
      this.$store.dispatch('DeleteCassetteSide',this.sideIndex);
    },
    lockTrack: function(event: any) {
      if (event.added) {
        this.$store.dispatch("SetLockedState", {
          trackId: event.added.element.id,
          lockState: true,
        });
        this.$store.dispatch("SetHiddenState", {
          trackId: event.added.element.id,
          hiddenState: false,
        });
      }
      if (event.moved) {
        this.$store.dispatch("SetLockedState", {
          trackId: event.moved.element.id,
          lockState: true,
        });
      }
      if (event.removed) {
        this.$store.dispatch("SortSides");
      }
    },
    addSide: function () {
      this.$store.dispatch("AddCassetteSide");
    }
  }
})
</script>