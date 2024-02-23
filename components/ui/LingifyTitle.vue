<template>
  <div
    :style="{ 'font-size': size + 'px' }"
    class="title text-seagreen tracking-wide"
  >
    Lingify
  </div>
</template>

<script setup lang="ts">
defineProps<{
  size: number
}>()
</script>

<style scoped>
.title {
  font-weight: 700;
}
</style>