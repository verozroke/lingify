<template>
  <v-btn
    :class="!icon ? 'px-6' : ''"
    :variant="mode"
    :style="{ color: textColor, width: width ? width : '' }"
    style="text-transform: none"
    :color="color"
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :icon="icon"
    :size="size"
    :density="density"
    :type="type"
    :loading="loading"
    :disabled="disabled"
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
  icon?: string | boolean,
  size?: string,
  density?: 'comfortable' | 'compact' | 'default',
  type?: string
  disabled?: boolean
  loading?: boolean
  mode: 'elevated' | 'tonal' | 'outlined',
}>()

</script>

<style scoped></style>