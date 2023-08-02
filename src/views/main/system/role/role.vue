<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
</script>

<template>
  <div class="role">
    <page-search :search-config="searchConfig" />
  </div>
</template>

<style lang="less" scoped>
.role {
  color: red;
}
</style>
