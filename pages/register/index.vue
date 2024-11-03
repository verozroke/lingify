<template>
  <div
    class="absolute flex-col gap-4 flex items-center justify-center bg-slate-100 inset-0 overflow-hidden"
  >
    <UiLogo />
    <UiLingifyTitle :size="54" />
    <h5 class="text-base text-slate-600 mb-4">
      place where you can learn many languages.
    </h5>
    <AuthRegisterForm />
  </div>
</template>

<script setup lang="ts">
import { useCookies } from "@vueuse/integrations/useCookies";
import { onMounted } from "vue";
const router = useRouter();
const userStore = useUserStore();
const cookies = useCookies(["token"]);

onMounted(async () => {
  if (userStore.isAuthenticated || cookies.get("token")) {
    try {
      await userStore.getUser();
      router.push({ name: "Profile" });
      return;
    } catch (error) {
      return;
    }
  }
});
</script>

<style scoped></style>
