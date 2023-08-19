import { defineStore } from "pinia";

export const useProjectStore = defineStore("projectStore", {
  state: () => ({
    userList: [],
  }),

  actions: {
    setUserJoinProject(userList: any) {
      console.log("project user", userList);
      this.userList = userList;
    },
  },
});
