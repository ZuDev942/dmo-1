import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class IssueService {
  async getIssue(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("api/v1/issue", {
      params: reqParams,
    });

    return res.data;
  }

  async createTask(reqParams: any) {
    const res: AxiosResponse = await httpClient.post("api/v1/task", reqParams);

    return res.data;
  }

  async updateTask(reqParams: any) {
    const res: AxiosResponse = await httpClient.put("api/v1/task", reqParams);

    return res.data;
  }

  async updateStatusTask(reqParams: any) {
    const res: AxiosResponse = await httpClient.put(
      "api/v1/task/update-status",
      reqParams
    );

    return res.data;
  }

  async taskDetail(idTask: number) {
    const res: AxiosResponse = await httpClient.get(`api/v1/task/${idTask}`);

    return res.data;
  }
}

export const issueService = new IssueService();
