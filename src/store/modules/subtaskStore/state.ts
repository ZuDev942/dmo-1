import { defineStore } from "pinia";

export const subtaskStore = defineStore("subtask", {
  state: () => ({
    isSubtaskModal: false,
    assigneeId: 0,
    assginorId: 0,
    members: [],
    idSubtask: 0,
  }),

  actions: {
    setOpenModal(status: boolean) {
      this.isSubtaskModal = status;
    },
  },
});
