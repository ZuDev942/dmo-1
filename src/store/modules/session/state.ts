import { defineStore } from "pinia";

interface IUser {
  avatar: string;
  email: string;
  fullname: string;
  role: string;
}

export const useSessionStore = defineStore("session", {
  state: () => ({
    user: null as IUser | null,
    sessionTimeout: 30 * 60 * 10000, // 30 phút
    lastActivity: Date.now(),
  }),

  actions: {
    login(user: IUser) {
      console.log("session", user);
      this.user = user;
      this.lastActivity = Date.now();
    },

    logout() {
      this.user = null;
    },

    updateLastActivity() {
      this.lastActivity = Date.now();
    },

    startSessionTimer() {
      setInterval(() => {
        if (Date.now() - this.lastActivity > this.sessionTimeout) {
          this.logout();
        }
      }, 1000);
    },
  },
});
