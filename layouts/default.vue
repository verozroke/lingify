<template>
  <v-app id="inspire">
    <ToastProvider />
    <Header />
    <v-main style="">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import ToastProvider from '~/providers/ToastProvider.vue';


</script>

<style scoped></style>