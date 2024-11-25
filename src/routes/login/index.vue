<template>
   <el-form 
    :model="loginForm" 
    :rules="rules" 
    ref="loginFormRef" 
    label-width="80px"
   >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" />
    </el-form-item>
    <el-button type="primary" @click="handleLogin">登录</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/use.ts'

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
      // 登录逻辑
      ElMessage({
        message: '登录成功',
        type:'success'
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>

</style>