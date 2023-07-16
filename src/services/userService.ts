import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class UserService {
  //   User management

  async getLisrUser(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("api/v1/user", {
      params: reqParams,
    });

    return res.data;
  }

  async deleteUser(id: number) {
    const res: AxiosResponse = await httpClient.delete(`api/v1/user/${id}`);

    return res.data;
  }

  async getDetailUser(id: number) {
    const res: AxiosResponse = await httpClient.get(`api/v1/user/${id}`);

    return res.data;
  }

  async createUser(reqParams: any) {
    const res: AxiosResponse = await httpClient.post("api/v0/user", reqParams);

    return res.data;
  }

  async updateAccount(reqParams: any) {
    const res: AxiosResponse = await httpClient.put("api/v1/user", reqParams);

    return res.data;
  }

  async changePassword(reqParams: any) {
    const res: AxiosResponse = await httpClient.post(
      "api/v1/user/changePassword",
      reqParams
    );

    return res.data;
  }
}

export const userService = new UserService();
