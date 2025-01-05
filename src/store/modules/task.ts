/**
 * 任务模块
 */

import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Pending' | 'Progress' | 'Done'
  dueDate: string
}

export default defineStore('task', () => {
  // 分别为每个状态维护一个任务列表
  const pendingTasks = ref<Task[]>([])
  const progressTasks = ref<Task[]>([])
  const doneTasks = ref<Task[]>([])

  // 添加任务
  const addTask = (task: Task) => {
    switch (task.status) {
      case 'Pending':
        pendingTasks.value.push(task)
        break
      case 'Progress':
        progressTasks.value.push(task)
        break
      case 'Done':
        doneTasks.value.push(task)
        break
    }
  }

  // 删除任务
  const deleteTask = (id: string) => {
    pendingTasks.value = pendingTasks.value.filter(task => task.id !== id)
    progressTasks.value = progressTasks.value.filter(task => task.id !== id)
    doneTasks.value = doneTasks.value.filter(task => task.id !== id)
  }

  const updateTaskStatus = (id: string, newStatus: Task['status']) => {
    const oldTask = getTaskById(id)
    if (!oldTask) return
    
    deleteTask(id)
    addTask({ ...oldTask, status: newStatus })
  }
  
  const getTaskById = (id: string): Task | null => {
    return (
      pendingTasks.value.find(task => task.id === id) ||
      progressTasks.value.find(task => task.id === id) ||
      doneTasks.value.find(task => task.id === id) ||
      null
    )
  }
  

  return {
    pendingTasks,
    progressTasks,
    doneTasks,
    addTask,
    deleteTask,
    updateTaskStatus
  }
})
