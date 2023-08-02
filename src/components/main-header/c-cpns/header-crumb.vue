<script lang="ts" setup>
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, userMenus))
</script>

<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped></style>
