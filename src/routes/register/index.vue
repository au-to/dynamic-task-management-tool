<template>
  <el-form 
    :model="registerForm" 
    :rules="rules" 
    ref="registerFormRef" 
    label-width="80px"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="registerForm.password" />
    </el-form-item>
    <el-button type="primary" @click="handleRegister">注册</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const registerFormRef = ref()

const registerForm = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleRegister = () => {
  registerFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      // 注册逻辑
      ElMessage({
        message: '注册成功',
        type: 'success'
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>

</style>