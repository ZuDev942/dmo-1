import { defineStore } from "pinia";

export const issueStore = defineStore("issue", {
  state: () => ({
    idTask: 0,
    idProject: 0,
  }),

  actions: {
    setTaskId(idTask: number) {
      console.log(idTask);
      this.idTask = idTask;
    },

    setProjectID(idProject: any) {
      console.log(idProject);
      this.idProject = idProject;
    },
  },
});
