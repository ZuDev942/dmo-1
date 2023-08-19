import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class YourworkService {
  async getListTask(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("/api/v1/task/your-work", {
      params: reqParams,
    });

    return res.data;
  }

  async deleteTask(id: number) {
    const res: AxiosResponse = await httpClient.delete(`/api/v1/task/${id}`);

    return res.data;
  }
}

export const yourworkService = new YourworkService();
