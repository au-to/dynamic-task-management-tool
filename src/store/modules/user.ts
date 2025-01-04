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
    const token: string | null = localStorage.getItem('loginToken')
    isLoggedIn.value = !!token
    username.value = JSON.parse(token || '{}')?.name
  }

  // 用户登录
  const login = (name: string, passWord: string) => {
    username.value = name
    isLoggedIn.value = true
    const loginToken = JSON.stringify({
      name,
      passWord
    })
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