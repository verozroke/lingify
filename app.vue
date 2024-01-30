<template>
  <div>
    {{ testStore.count }}
    <v-btn @click="() => testStore.count = testStore.count + 1">Hello World!</v-btn>
  </div>
</template>


<script lang="ts" setup>
import { useTestStore } from './stores/TestStore';

const testStore = useTestStore()
</script>
