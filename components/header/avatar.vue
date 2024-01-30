<template>
  <v-avatar
    class="hidden-sm-and-down"
    color="grey-darken-1"
    size="32"
  ></v-avatar>
  <v-btn
    variant="elevated"
    prepend-icon="mdi-login"
    color="teal-accent-4"
    class="text-transform-none"
  >Войти</v-btn>
  <v-btn
    variant="elevated"
    color="teal-accent-4"
    prepend-icon="mdi-account-plus"
    class="text-transform-none ml-4"
  >Регистрация</v-btn>
</template>

<script setup lang="ts">

</script>

<style scoped>
.text-transform-none {
  text-transform: none;
}
</style>