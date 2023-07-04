import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class UserService {
  //   User management

  async getLisrUser() {
    // const res: AxiosResponse = await httpClient.post("api/user/list", {
    //   userName: "",
    //   email: "",
    //   limit: "10",
    //   page: "1",
    // });
   
    const res: AxiosResponse = await httpClient.post("api/role/list");

    return res.data;
  }

  async deleteUser() {
    const res: AxiosResponse = await httpClient.delete("users");

    return res.data;
  }

  async getDetailUser(id: number) {
    const res: AxiosResponse = await httpClient.get(`users/${id}`);

    return res.data;
  }
}

export const userService = new UserService();
