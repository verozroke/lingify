<template>
  <v-progress-circular
    :color="colors.SEAGREEN"
    class="loader"
    indeterminate
    :size="40"
  ></v-progress-circular>
</template>

<script setup lang="ts">
import { colors } from "~/core/colors";
</script>

<style scoped>
.loader {
  position: fixed;
  top: 100px;
  left: calc(50vw - 40px);
}
</style>
