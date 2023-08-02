<script lang="ts" setup>
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/image/login-bg.svg');
}
</style>
