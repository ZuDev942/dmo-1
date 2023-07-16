import { defineStore } from "pinia";
import { IUser } from "./types";

export const useUserPage = defineStore("userPage", {
  state: () =>
    ({
      avatar: "",
      email: "",
      fullname: "",
    } as IUser),
});
