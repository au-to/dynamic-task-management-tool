<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <el-form 
        class="login-form" 
        :model="loginForm" 
        :rules="rules" 
        ref="loginFormRef" 
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button 
          class="button" 
          type="primary" 
          @click="handleLogin"
        >
          登录
        </el-button>
        <span class="register-link" @click="toRegister">去注册</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'

const userStore = useUserStore()
const router = useRouter()
const loginFormRef = ref()
const loginForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      userStore.login(loginForm.username, loginForm.password)
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
      router.push('/home')
    } else {
      return false
    }
  })
}

const toRegister = () => {
  router.push('/register')
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #80deea);
}

.login-box {
  width: 360px;
  padding: 30px 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin-bottom: 20px;
    color: #333;
    font-weight: bold;
    font-size: 24px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px; // 表单项的间距
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    .button {
      width: 100%;
      max-width: 120px; // 按钮最大宽度
      background: #26c6da;
      border: none;

      &:hover {
        background: #00acc1;
      }
    }

    .register-link {
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      color: #26c6da;
      font-size: 14px;
      margin-left: 30px;
    }
  }
}
</style>