<template>
    <v-navigation-drawer
        permanent>
      <template v-slot:prepend>
        <v-sheet variant="outlined" class="">
          <v-img
            :src="cassette.image"
            aspectRatio="1">
          </v-img>
          <v-card-title v-text="cassette.name"></v-card-title>
          <v-card-subtitle v-text="cassette.owner.name"></v-card-subtitle>
          <v-card-text v-html="cassette.description"></v-card-text>
          <v-divider></v-divider>
        </v-sheet>
      </template>
      <template v-slot:append>
        <v-divider></v-divider>
        <MediaControls></MediaControls>
      </template>

      <v-list class="" lines="one">
        <v-list-item v-if="hiddenTracks.length == 0">
            <v-list-item-title v-text="'unused tracks'"></v-list-item-title>
        </v-list-item>
        <draggable 
          style="min-height: 250px;"
          item-key="id"
          v-bind="DragOptions"
          v-model="hiddenTracks">
            <template #item="{element}">
              <div>
                <HoldTrack v-bind:track="element"></HoldTrack>
                <v-divider></v-divider>
              </div>
            </template>
        </draggable>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid fill-height>
        <v-row 
            align="start"
            justify="center">
          <v-col 
            cols="5"
            :key="n" v-for="n in sidesCount"
            class="d-flex" 
            style="flex-direction:column">
                <CassetteSide v-bind:sideIndex="n - 1"></CassetteSide>
          </v-col>
        </v-row>  
      </v-container>
    </v-main>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import CassetteSide from '@/components/CassetteSide.vue';
import HoldTrack from '@/components/HoldTrack.vue';
import MediaControls from '@/components/MediaControls.vue'
import draggable from 'vuedraggable'

export default defineComponent({
  name: 'CassetteView',
  components: {
    HoldTrack,
    draggable,
    CassetteSide,
    MediaControls,
  },
  async mounted() {
    await this.$store.dispatch("ResetCassette");
    await this.$store.dispatch("GetPlaylistTracks", this.$route.params.id);
    await this.$store.dispatch("GetAudioFeatures");
    await this.$store.dispatch("SortSides");
  },
  data: () => {
    return {
      DragOptions: {
        animation: 150,
        group: "tracks",
        disabled: false,
      }
    }
  },
  computed: {
    cassette() {
        return this.$store.getters.GetCassette;
    },
    sidesCount() {
      return this.$store.getters.GetCassette.sides.length;
    },
    hiddenTracks: {
      get() {
        return this.$store.getters.GetHiddenTracks;
      },
      set(value: any) {
        this.$store.dispatch("UpdateHiddenTracks", value);
      },
    },
  },
});
</script>
  