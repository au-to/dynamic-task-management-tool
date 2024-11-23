/**
 * 用户模块
 */

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  // 定义用户状态
  const username = ref('');
  const isLoggedIn = ref(false);

  // 用户登录
  const login = (user: string) => {
    username.value = user;
    isLoggedIn.value = true;
  };

  // 用户登出
  const logout = () => {
    username.value = '';
    isLoggedIn.value = false;
  };

  return {
    username,
    isLoggedIn,
    login,
    logout
  };
});