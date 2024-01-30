<template>
  <div
    :style="{ 'font-size': size + 'px' }"
    class="title text-teal-accent-4"
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
  letter-spacing: .02em;
}</style>