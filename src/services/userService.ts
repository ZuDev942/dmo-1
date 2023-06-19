import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class UserService {
  //   User management

  async getLisrUser() {
    const res: AxiosResponse = await httpClient.get("users");

    return res.data;
  }

  async deleteUser() {
    const res: AxiosResponse = await httpClient.delete("users");

    return res.data;
  }
}

export const userService = new UserService();
