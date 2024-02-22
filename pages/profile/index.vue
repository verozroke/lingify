<template>
  <div>
    {{ userStore.user?.nickname }}
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

onMounted(async () => {
  await userStore.getUser()
})


</script>

<style scoped></style>