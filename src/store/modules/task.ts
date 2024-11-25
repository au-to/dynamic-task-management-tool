/**
 * 任务模块
 */

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' // 优先级
  status: 'To Do' | 'In Progress' | 'Done' // 状态
  dueDate: string // 截止日期
}

export const useTaskStore = defineStore('task', () => {
  // 定义任务列表的状态
  const taskList = ref<Task[]>([])

  // 根据状态过滤任务
  const getTasksByStatus = computed(() => {
    return (status: Task['status']) =>
      taskList.value.filter((task) => task.status === status)
  })

  // 添加任务
  const addTask = (task: Task) => {
    taskList.value.push(task)
  }

  // 更新任务
  const updateTask = (task: Task) => {
    const index = taskList.value.findIndex((item) => item.id === task.id)
    if (index !== -1) {
      taskList.value[index] = task
    }
  }

  // 删除任务
  const deleteTask = (id: string) => {
    taskList.value = taskList.value.filter((task) => task.id !== id)
  }

  return {
    taskList,
    getTasksByStatus,
    addTask,
    updateTask,
    deleteTask
  }
})
