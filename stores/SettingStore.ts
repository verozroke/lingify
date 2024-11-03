import { defineStore } from "pinia";
import { useToast } from "~/hooks/use-toast";
import userService from "~/services/user.service";

export type ChangeAvatarValidator = {
  avatarUrl: string;
};

export type ChangeBannerValidator = {
  bannerUrl: string;
};

export type ChangeNameValidator = {
  nickname: string;
};

export type ChangeEmailValidator = {
  email: string;
};

export type ChangePasswordValidator = {
  oldPassword: string;
  newPassword: string;
};

export type ChangeFullNameValidator = {
  fullName: string;
};

export type ChangeBioValidator = {
  bio: string;
};

export type ChangeCountryValidator = {
  country: string;
};

export const useSettingStore = defineStore("SettingStore", () => {
  const userStore = useUserStore();
  const { toast } = useToast();
  const tab = ref<string>("");
  const imageUrlInput = ref<string>("");
  const bannerUrlInput = ref<string>("");
  const nameInput = ref<string>("");
  const emailInput = ref<string>("");
  const bioInput = ref<string>("");
  const fullNameInput = ref<string>("");
  const countryInput = ref<string>("");
  const oldPasswordInput = ref<string>("");
  const newPasswordInput = ref<string>("");
  const newPasswordRepeatInput = ref<string>("");
  const darkMode = ref<boolean>(false);

  const saveImage = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      const payload: ChangeAvatarValidator = {
        avatarUrl: imageUrlInput.value,
      };

      const message = await userService.changeAvatar(
        userStore.user.id,
        payload,
      );
      // on success
      userStore.user.avatar!.url = imageUrlInput.value;
      toast.success({ message });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your avatar" });
    }
  };

  const saveBanner = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      const payload: ChangeBannerValidator = {
        bannerUrl: bannerUrlInput.value,
      };

      const message = await userService.changeBanner(
        userStore.user.id,
        payload,
      );
      // on success
      userStore.user.banner!.url = bannerUrlInput.value;
      toast.success({ message });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your banner" });
    }
  };

  const saveUsername = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      const payload: ChangeNameValidator = {
        nickname: nameInput.value,
      };

      const message = await userService.changeName(userStore.user.id, payload);
      // on success
      userStore.user.nickname = nameInput.value;
      toast.success({ message: message });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your username" });
    }
  };

  const saveEmail = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      const payload: ChangeEmailValidator = {
        email: emailInput.value,
      };

      const message = await userService.changeEmail(userStore.user.id, payload);
      // on success
      userStore.user.email = emailInput.value;
      toast.success({ message });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your email" });
    }
  };

  const saveFullName = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      const payload: ChangeFullNameValidator = {
        fullName: fullNameInput.value,
      };

      const message = await userService.changeFullName(
        userStore.user.id,
        payload,
      );
      // on success
      userStore.user.fullName = fullNameInput.value;
      toast.success({ message });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your fullName" });
    }
  };

  const saveBio = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      const payload: ChangeBioValidator = {
        bio: bioInput.value,
      };

      const message = await userService.changeBio(userStore.user.id, payload);
      // on success
      userStore.user.bio = bioInput.value;
      toast.success({ message });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your bio" });
    }
  };

  const saveCountry = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      const payload: ChangeCountryValidator = {
        country: countryInput.value,
      };

      const country = await userService.changeCountry(
        userStore.user.id,
        payload,
      );
      // on success
      userStore.user.country = country;
      toast.success({ message: "Changed your country" });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your country" });
    }
  };

  const savePassword = async () => {
    if (!userStore.user) {
      return;
    }
    try {
      if (newPasswordRepeatInput.value !== newPasswordInput.value) {
        toast.error({ message: "Passwords doesn't match" });
        return;
      }
      const payload: ChangePasswordValidator = {
        oldPassword: oldPasswordInput.value,
        newPassword: newPasswordInput.value,
      };
      const message = await userService.changePassword(
        userStore.user.id,
        payload,
      );
      // on success
      toast.success({ message });
    } catch (error) {
      // on error
      toast.error({ message: "Could not change your password" });
    }
  };

  const setBasicValues = () => {
    if (!userStore.user) {
      return;
    }
    imageUrlInput.value = userStore.user.avatar
      ? userStore.user.avatar.url
      : "";
    nameInput.value = userStore.user.nickname;
    emailInput.value = userStore.user.email;
    bioInput.value = userStore.user.bio ? userStore.user.bio : "";
    countryInput.value = userStore.user.country
      ? userStore.user.country.name
      : "";
    fullNameInput.value = userStore.user.fullName
      ? userStore.user.fullName
      : "";
  };

  return {
    tab,
    imageUrlInput,
    bannerUrlInput,
    saveImage,
    nameInput,
    emailInput,
    bioInput,
    fullNameInput,
    countryInput,
    setBasicValues,
    saveUsername,
    saveEmail,
    savePassword,
    oldPasswordInput,
    newPasswordInput,
    newPasswordRepeatInput,
    darkMode,
    saveFullName,
    saveBio,
    saveCountry,
    saveBanner,
  };
});
