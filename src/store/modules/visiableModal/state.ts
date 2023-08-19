import { defineStore } from "pinia";

export const visiableModal = defineStore("visiable", {
  state: () => ({
    isTaskModal: false,
  }),

  actions: {
    setTaskModal(status: boolean) {
      console.log(status);
      this.isTaskModal = status;
    },

    // logout() {
    //   this.user = null;
    // },

    // updateLastActivity() {
    //   this.lastActivity = Date.now();
    // },
  },
});
