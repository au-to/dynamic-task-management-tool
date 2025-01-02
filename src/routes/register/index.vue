<template>
  <div class="register-container">
    <div class="register-box">
      <h2>注册</h2>
      <el-form
        class="register-form"
        :model="registerForm"
        :rules="rules"
        ref="registerFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入密码"
          />
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button class="button" type="primary" @click="handleRegister">
          注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"

const registerFormRef = ref()
const router = useRouter()

const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: ""
})

const ruleFn = (rule: any, value: string) => {
  if (value !== registerForm.password) {
    return new Error("两次密码输入不一致")
  }
  return true
}

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    { validator: ruleFn, trigger: "blur" }
  ]
}

const handleRegister = () => {
  registerFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      ElMessage({
        message: "注册成功",
        type: "success"
      })
      router.push("/login")
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7fa, #80deea);

  .register-box {
    width: 360px;
    padding: 20px;
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

    .register-form {
      display: flex;
      flex-direction: column;
    }

    .el-form-item {
      margin-bottom: 20px;

      .el-input {
        width: 100%;
      }
    }

    .footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      .button {
        width: 100%;
        max-width: 120px; // 按钮最大宽度
        background: #26c6da;
        color: #fff;
        font-weight: bold;
        border: none;
        transition: all 0.3s;
        &:hover {
          background: #00acc1;
        }
      }
    }
  }
}
</style>