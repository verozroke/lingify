<template>
  <v-btn
    class="px-6"
    :variant="mode"
    :style="{ color: textColor, width: width ? width : 'fit-content' }"
    style="text-transform: none"
    :color="color"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :icon="icon"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">

defineProps<{
  color: string,
  textColor?: string,
  width?: string,
  prependIcon?: string,
  appendIcon?: string,
  icon?: string,
  mode: 'elevated' | 'tonal' | 'outlined',
}>()

</script>

<style scoped></style>