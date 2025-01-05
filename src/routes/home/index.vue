<template>
  <div class="home">
    <div class="header">
      <el-button v-if="userStore.isLoggedIn">{{ 'hello' + ' ' + userStore.username }}</el-button>
      <el-button v-if="userStore.isLoggedIn" @click="handleLogout">退出登录</el-button>
      <el-button v-if="userStore.isLoggedIn" type="primary" @click="showCreateModal = true">新增任务</el-button>
    </div>
    <div class="task-board">
      <div 
        v-for="status in taskStatus" 
        :key="status"
        class="task-column"
        :data-status="status"
      >
        <h3>{{ status }}</h3>
        <Draggable 
          :list="filteredTasks(status as 'Pending' | 'Progress' | 'Done')" 
          group="{ name: 'tasks', pull: true, put: true }" 
          @end="onTaskDrop"
          :animation="200"
        >
          <template #item="{ element }">
            <div class="task-card">
              <h4>{{ element.title }}</h4>
              <p>{{ element.description }}</p>
              <p>{{ element.dueDate }}</p>
              <el-tag :type="priorityColor(element.priority)">
                {{ element.priority }}
              </el-tag>
              <el-icon 
                class="delete-icon" 
                @click="taskStore.deleteTask(element.id)" 
                color="red"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                  <path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path>
                </svg>
              </el-icon>
            </div>
          </template>
        </Draggable>
      </div>
    </div>
    <el-dialog 
      v-model="showCreateModal" 
      title="新增任务" 
      class="dialog"
      width="600px"
      @close="handleClose"
    >
      <el-form 
        :model="newTask"
        class="create-task-form"
        label-width="80px"
      >
        <el-form-item label="标题">
          <el-input v-model="newTask.title" placeholder="请填写任务名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newTask.description" placeholder="请填写任务描述" />
        </el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="newTask.priority" placeholder="请选择优先级">
            <el-option label="低" value="Low" />
            <el-option label="中" value="Medium" />
            <el-option label="高" value="High" />
          </el-select>
        </el-form-item>
        <el-form-item label="截止日期" class="due-date">
          <el-date-picker
            v-model="newTask.dueDate"
            type="datetime"
            placeholder="请选择截止时间"
            value-format="YYYY-MM-DD HH:MM"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreateModal = false">取消</el-button>
        <el-button type="primary" @click="createTask">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useTaskStore from '@/store/modules/task'
import useUserStore from '@/store/modules/user'
import Draggable from 'vuedraggable'

const router = useRouter()

// 引入状态管理模块
const taskStore = useTaskStore()
const userStore = useUserStore()

// 控制新增任务的弹窗
const showCreateModal = ref(false)

// 新任务的默认数据
let newTask = reactive({
  id: '',
  title: '',
  description: '',
  priority: '' as 'Low' | 'Medium' | 'High',
  status: 'Pending' as const,
  dueDate: ''
})

// 任务的状态列表
const taskStatus = ['Pending', 'Progress', 'Done'] as const

// 创建任务
const createTask = () => {
  newTask.id = Date.now().toString() // 使用时间戳生成唯一 ID
  taskStore.addTask({ ...newTask })  // 添加任务到 store
  showCreateModal.value = false     // 关闭弹窗
}

// 筛选任务：根据状态返回对应的任务列表
const filteredTasks = (status: 'Pending' | 'Progress' | 'Done') => taskStore.getTasksByStatus(status)

// 获取优先级对应的颜色
const priorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'danger'
    case 'Medium':
      return 'warning'
    default:
      return 'success'
  }
}

// 用户退出
const handleLogout = () => {
  userStore.logout() // 模拟退出
  router.push('/login') // 跳转到登录页面
}

// 关闭弹窗
const handleClose = () => {
  showCreateModal.value = false
  Object.assign(newTask, {
    id: '',
    title: '',
    description: '',
    priority: '',
    status: 'Pending',
    dueDate: ''
  })
}

// 拖拽完成时更新任务状态
const onTaskDrop = (event: any) => {
  const { to, item } = event

  // 获取目标列的状态
  const newStatus = to.getAttribute('data-status')
  if (!newStatus) return

  // 更新任务状态
  const task = item
  if (task.status !== newStatus) {
    taskStore.updateTask({ ...task, status: newStatus })
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f4f4f4;
  }
  .task-board {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  .task-column {
    flex: 1;
    padding: 10px;
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 8px;
    min-height: 300px;

    h3 {
      text-align: center;
      margin-bottom: 10px;
      color: #333;
    }

    .task-card {
      cursor: grab;
      padding: 10px;
      margin: 10px 0;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;

      h4 {
        margin: 0;
      }

      p {
        color: #666;
      }

      .delete-icon {
        display: none;
      }

      &:hover {
        box-shadow: inset 0 0 0 1px #f5f5f5;
        cursor: pointer;
        transform: translateY(-3px);
        .delete-icon {
          display: block;
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;
        }
      }

      &:active {
        cursor: grabbing;
        opacity: 0.8;
      }
    }
  }

  .dialog {
    .create-task-form {
      .due-date {
        :deep(.el-date-editor) {
          width: 100%;
        }
      }
    }
  }
}
</style>
