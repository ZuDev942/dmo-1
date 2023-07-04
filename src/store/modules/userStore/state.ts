import { defineStore } from "pinia";
import { IUser } from "./types";

export const useUserPage = defineStore("userPage", {
  state: () =>
    ({
      id: 0,
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      image: "",
      token: "",
    } as IUser),
});
