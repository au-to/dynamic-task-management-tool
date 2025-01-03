/**
 * 用户模块
 */

import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('user', () => {
  // 定义用户状态
  const username = ref('')
  const isLoggedIn = ref(false)

  // 初始化登录状态
  const initialize = () => {
    const token = localStorage.getItem('loginToken')
    isLoggedIn.value = !!token
  }

  // 用户登录
  const login = (user: string) => {
    username.value = user
    isLoggedIn.value = true
    const loginToken = username.value + new Date().getTime()
    localStorage.setItem('loginToken', loginToken)
  }

  // 用户登出
  const logout = () => {
    username.value = ''
    isLoggedIn.value = false
    localStorage.removeItem('loginToken')
  }

  return {
    username,
    isLoggedIn,
    login,
    logout,
    initialize
  }
})