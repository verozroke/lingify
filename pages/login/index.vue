<template>
  <div class="absolute flex-col gap-4 flex items-center justify-center bg-slate-100 inset-0 overflow-hidden">
    <UiLogo />
    <UiLingifyTitle :size="54" />
    <h5 class="text-base text-slate-600 mb-4">place where you can fly through your fantasy.</h5>
    <AuthLoginForm />
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/hooks/use-toast';
import { onMounted } from 'vue'


const { toast } = useToast()

onMounted(() => {
  toast.success({ message: 'You have successfully mounted' })
})
</script>

<style scoped></style>