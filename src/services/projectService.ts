import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class ProjectService {
  async getListProject(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("api/v1/project", {
      params: reqParams,
    });

    return res.data;
  }

  async createProject(reqParams: any) {
    const res: AxiosResponse = await httpClient.post(
      "api/v1/project",
      reqParams
    );

    return res.data;
  }

  async updateProject(reqParams: any) {
    const res: AxiosResponse = await httpClient.put(
      "api/v1/project",
      reqParams
    );

    return res.data;
  }

  async projectYourWork() {
    const res: AxiosResponse = await httpClient.get("api/v1/project/your-work");

    return res.data;
  }

  async deleteProject(idProject: number) {
    const res: AxiosResponse = await httpClient.delete(
      `/api/v1/project/${idProject}`
    );

    return res.data;
  }

  async detailProject(idProject: number) {
    const res: AxiosResponse = await httpClient.get(
      `/api/v1/project/${idProject}`
    );

    return res.data;
  }
}

export const projectService = new ProjectService();
