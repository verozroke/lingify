import axios from "axios";
import type { User } from "~/core/types/user";

export type LoginUserValidator = {
  nickname: string;
  password: string;
};

export type RegisterUserValidator = {
  email: string;
  nickname: string;
  password: string;
};

class AuthService {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async login(body: LoginUserValidator) {
    const { data } = await axios.post(`${this.baseUrl}/auth/signin`, body, {
      withCredentials: true,
      httpsAgent: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data.message;
  }

  async register(body: RegisterUserValidator) {
    const {
      data: { message },
    } = await axios.post(`${this.baseUrl}/auth/signup`, body, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return message;
  }

  async fetchUser() {
    const { data } = await axios.get(`${this.baseUrl}/users/hash`, {
      withCredentials: true,
    });

    return data.user as User;
  }

  async signOut() {
    const { data } = await axios.get(`${this.baseUrl}/auth/signout`, {
      withCredentials: true,
    });

    return data;
  }
}

const authService = new AuthService("http://localhost:4000");
export default authService;
