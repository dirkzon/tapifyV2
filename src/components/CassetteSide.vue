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
                <v-card tile class="ma-1" :disabled="element.hidden">
                  <v-row style="margin: 1px">
                    <v-col md="2">
                          <v-img :src="element.image"></v-img>
                    </v-col>
                    <v-col md="1">
                      <v-row>
                        <v-card-title v-text="element.name" style="margin: 0"></v-card-title>
                      </v-row>
                      <v-row
                        v-for="artist in element.artists"
                        :key="artist"
                        style="padding: 2px">
                        <v-card-subtitle v-text="`${artist}; `"></v-card-subtitle>
                      </v-row>
                    </v-col>
                    <v-col md="2" offset-md="7">
                        <v-btn-group>
                          <v-btn icon x-small @click="SetHidden(element.id)">
                              <v-icon>
                                  mdi-eye-off
                              </v-icon>
                          </v-btn>
                      </v-btn-group>
                    </v-col>
                  </v-row>
                </v-card>
            </template>
        </draggable>
    </v-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'

export default defineComponent({
  name: 'CassetteSide',
  props: ["sideIndex"],
  components: {
    draggable,
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