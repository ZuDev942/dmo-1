import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class IssueService {
  async getIssue(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("api/v1/issue", {
      params: reqParams,
    });

    return res.data;
  }

  async createIssue(reqParams: any) {
    const res: AxiosResponse = await httpClient.post(
      "/api/v1/issue",
      reqParams
    );

    return res.data;
  }

  async detailIssue(idIssue: number) {
    const res: AxiosResponse = await httpClient.get(`/api/v1/issue/${idIssue}`);

    return res.data;
  }

  async updateIssue(reqParams: any) {
    const res: AxiosResponse = await httpClient.put("/api/v1/issue", reqParams);

    return res.data;
  }

  async getIssueByProject(reqParams: any) {
    const res: AxiosResponse = await httpClient.get(
      "/api/v1/issue/by-project",
      {
        params: reqParams,
      }
    );

    return res.data;
  }

  async getIssueByTask(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("/api/v1/issue/by-task", {
      params: reqParams,
    });

    return res.data;
  }
}

export const issueService = new IssueService();
