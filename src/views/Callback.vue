<template>
  <div class="callback"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CallbackView',
  async mounted() {
    await this.$store.dispatch("Authorize", { code: this.$route.query.code });
    await this.$store.dispatch("FetchUserProfile");
    await this.$router.push( { name: "home" } );
  },
});
</script>
