import { computed } from "vue";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "~/core/types/user";
import { useRouter } from "vue-router";
import { colorsEnum } from "~/core/colors";
import authService from "~/services/auth.service";
import { useCookies } from "@vueuse/integrations/useCookies";

export const useUserStore = defineStore("userStore", () => {
  const user = ref<User | null>(null);
  const isLogoutLoading = ref<boolean>(false);
  const cookies = useCookies(["token"]);
  const router = useRouter();
  const toastStore = useToastStore();

  const getUser = async () => {
    if (!cookies.get("token")) {
      router.push("/login");
      return;
    }

    try {
      const tokenUser = await authService.fetchUser();
      user!.value = tokenUser;
      isAuthenticated.value = true;
    } catch (error) {
      router.push("/login");
      cookies.remove("token");
      throw new Error("Unauthorized 401");
    }
  };

  const logout = async () => {
    try {
      isLogoutLoading.value = true;
      await authService.signOut();
      toastStore.openSnackbar(
        "Выход из вашего аккаунта произведен успешно.",
        2000,
        colorsEnum.EMERALD,
      );
      isLogoutLoading.value = false;
      isAuthenticated.value = false;
      router.push("/login");
    } catch (error) {
      toastStore.openSnackbar(
        "Не удалось выйти из вашего аккаунта.",
        2000,
        colorsEnum.RED,
      );
      isLogoutLoading.value = false;
    }
  };

  const isAuthenticated = ref(false);

  return {
    isAuthenticated,
    user,
    getUser,
    logout,
    isLogoutLoading,
  };
});
