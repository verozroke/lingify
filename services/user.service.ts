import axios from "axios";
import type {
  ChangeAvatarValidator,
  ChangeBioValidator,
  ChangeCountryValidator,
  ChangeEmailValidator,
  ChangeFullNameValidator,
  ChangeNameValidator,
  ChangePasswordValidator,
} from "~/stores/SettingStore";
import type { MessageResponse } from "~/core/types/response";
import type { Country } from "~/core/types/country";

class UserService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async changeAvatar(userId: string, body: ChangeAvatarValidator) {
    const { data } = await axios.patch<MessageResponse>(
      `${this.baseUrl}/users/${userId}/avatar`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data.message;
  }

  async changeBanner(userId: string, body: ChangeBannerValidator) {
    const { data } = await axios.patch<MessageResponse>(
      `${this.baseUrl}/users/${userId}/banner`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data.message;
  }

  async changeName(userId: string, body: ChangeNameValidator) {
    const { data } = await axios.patch<MessageResponse>(
      `${this.baseUrl}/users/${userId}/name`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data.message;
  }

  async changeEmail(userId: string, body: ChangeEmailValidator) {
    const { data } = await axios.patch<MessageResponse>(
      `${this.baseUrl}/users/${userId}/email`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data.message;
  }

  async changeCountry(userId: string, body: ChangeCountryValidator) {
    const { data } = await axios.patch<Country>(
      `${this.baseUrl}/users/${userId}/country`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  }

  async changeBio(userId: string, body: ChangeBioValidator) {
    const { data } = await axios.patch<MessageResponse>(
      `${this.baseUrl}/users/${userId}/bio`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data.message;
  }

  async changeFullName(userId: string, body: ChangeFullNameValidator) {
    const { data } = await axios.patch<MessageResponse>(
      `${this.baseUrl}/users/${userId}/full-name`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data.message;
  }

  async changePassword(userId: string, body: ChangePasswordValidator) {
    const { data } = await axios.patch<MessageResponse>(
      `${this.baseUrl}/users/${userId}/password`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return data.message;
  }
}

const userService = new UserService("http://localhost:4000");
export default userService;
