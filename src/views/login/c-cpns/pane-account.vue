<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
// import type { FormInstance, FormRules } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

// 定义账号、密码常量
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.执行账号的登录逻辑
// const formRef = ref<FormInstance>()
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的账号和密码(去除响应式)
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求（携带账号和密码，直接传入响应式的account也行）
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 输入的账号密码格式不正确')
    }
  })
}

defineExpose({ loginAction })
</script>

<template>
  <div class="pane-account">
    <el-form
      :model="account"
      label-width="60px"
      size="large"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input placeholder="请输入帐号" v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>
