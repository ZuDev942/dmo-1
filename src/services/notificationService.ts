import { AxiosResponse } from "axios";

import { httpClient } from "@/core";

class NotificationService {
  async getNotification(reqParams: any) {
    const res: AxiosResponse = await httpClient.get("api/v1/notification", {
      params: reqParams,
    });

    return res.data;
  }

  async putSeenNotification(id: number) {
    const res: AxiosResponse = await httpClient.put(
      `/api/v1/notification/${id}`
    );

    return res.data;
  }

  async putSeenAll() {
    const res: AxiosResponse = await httpClient.put(
      "/api/v1/notification/seen-all"
    );

    return res.data;
  }
}

export const notificationService = new NotificationService();
