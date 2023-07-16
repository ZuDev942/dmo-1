import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class DayoffService {
  async getDayoff(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("api/v1/dayoff", {
      params: reqParams,
    });

    return res.data;
  }

  async postDayoff(reqParams: any) {
    const res: AxiosResponse = await httpClient.post(
      "api/v1/dayoff",
      reqParams
    );

    return res.data;
  }

  async putDayoff(reqParams: any) {
    const res: AxiosResponse = await httpClient.put(
      "api/v1/dayoff/update-approved-status",
      reqParams
    );

    return res.data;
  }
}

export const dayoffService = new DayoffService();
