/**
 * 任务模块
 */

import { defineStore } from "pinia";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High'; // 优先级
  status: 'To Do' | 'In Progress' | 'Done'; // 状态
  dueDate: string; // 截止日期
}

interface TaskState {
  taskList: Task[];
}

export const useTaskStore = defineStore("task", {
  state: (): TaskState => {
    return {
      taskList: [] // 任务列表
    }
  },
  getters: {
    // 根据状态过滤任务
    getTasksByStatus: (state) => {
      return (status: Task['status']) => state.taskList.filter((task) => task.status === status);
    }
  },
  actions: {
    // 添加任务
    addTask(task: Task) {
      this.taskList.push(task);
    },
    // 更新任务
    updateTask(task: Task) {
      const index = this.taskList.findIndex((item) => item.id === task.id);
      if (index !== -1) {
        this.taskList[index] = task;
      }
    },
    // 删除任务
    deleteTask(id: string) {
      this.taskList = this.taskList.filter((task) => task.id !== id);
    }
  }
})