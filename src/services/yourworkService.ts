import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class YourworkService {
  async getListTask() {
    const res: AxiosResponse = await httpClient.get("tasks");

    return res.data;
  }
}

export const yourworkService = new YourworkService();
