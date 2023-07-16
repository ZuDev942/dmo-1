import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class ProjectService {
  async getListProject(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("api/v1/project", {
      params: reqParams,
    });

    return res.data;
  }
}

export const projectService = new ProjectService();
