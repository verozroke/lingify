<template>
  <user-avatar v-if="userStore.isAuthenticated"></user-avatar>
  <v-btn
    v-if="!userStore.isAuthenticated"
    @click="router.push('/login')"
    variant="elevated"
    density="comfortable"
    prepend-icon="mdi-login"
    color="teal-accent-4"
    class="text-transform-none"
    >Войти</v-btn
  >
  <v-btn
    v-if="!userStore.isAuthenticated"
    @click="router.push('/register')"
    variant="elevated"
    density="comfortable"
    color="teal-accent-4"
    prepend-icon="mdi-account-plus"
    class="text-transform-none ml-4"
    >Регистрация</v-btn
  >
</template>

<script setup lang="ts">
const userStore = useUserStore();
const router = useRouter();
</script>

<style scoped>
.text-transform-none {
  text-transform: none;
}
</style>
