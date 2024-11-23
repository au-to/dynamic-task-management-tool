/**
 * 用户模块
 */

import { defineStore } from 'pinia';

interface UserState {
  username: string;
  isLoggedIn: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: '',
    isLoggedIn: false,
  }),
  actions: {
    login(username: string) {
      this.username = username;
      this.isLoggedIn = true;
    },
    logout() {
      this.username = '';
      this.isLoggedIn = false;
    },
  },
});
