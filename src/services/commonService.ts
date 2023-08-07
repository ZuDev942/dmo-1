import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class CommonService {
  async uploadFile(reqParams: any) {
    const res: AxiosResponse = await httpClient.post(
      "api/v1/upload",
      reqParams
    );

    return res.data;
  }
}

export const commonService = new CommonService();
