import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class AuthService {
  async login(userName: string, password: string) {
    const res: AxiosResponse = await httpClient.post("api/v0/user/login", {
      userName,
      password,
    });

    return res.data;
  }

  async refreshToken() {
    const res: AxiosResponse = await httpClient.post(
      "auth/refresh-token",
      null,
      {
        withCredentials: true,
      }
    );

    return res.data;
  }

  async forgotPassword(email: any) {
    const res: AxiosResponse = await httpClient.get(
      "/api/v1/user/forgetPassword",
      {
        params: email,
      }
    );

    return res.data;
  }
}

export const authService = new AuthService();
