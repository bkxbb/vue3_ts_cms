<script lang="ts" setup>
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

// 是否记住密码
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const activeName = ref<string>('account')
const accountRef = ref<InstanceType<typeof PaneAccount>>()

// 立即登录的点击事件
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log(111)
  }
}
</script>

<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">后台管理系统</h1>
    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <!-- 帐号登录的pane -->
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录的pane -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Cellphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox label="记住密码" v-model="isRemPwd" size="large"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="handleLoginBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
