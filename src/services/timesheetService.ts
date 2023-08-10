import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class TimesheetService {
  async getDashboardPersonal(reqParams: any) {
    const res: AxiosResponse = await httpClient.get(
      "/api/v1/dashboard/byPersonal",
      {
        params: reqParams,
      }
    );

    return res.data;
  }

  async getDashboardMember(reqParams: any) {
    const res: AxiosResponse = await httpClient.get(
      "/api/v1/dashboard/byMember",
      {
        params: reqParams,
      }
    );

    return res.data;
  }

  async postReportDaily(reqParams: any) {
    const res: AxiosResponse = await httpClient.post(
      "/api/v1/report/daily",
      reqParams
    );

    return res.data;
  }
}

export const timesheetService = new TimesheetService();
