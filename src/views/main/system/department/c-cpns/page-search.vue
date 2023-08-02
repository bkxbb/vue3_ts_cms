<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 定义form的数据
const searchForm = reactive({
  // 部门名字
  name: '',
  // 部门领导
  leader: '',
  // 创建时间
  createAt: ''
})

// 重置操作
const formRef = ref<FormInstance>()
function handleResetClick() {
  // form 中的数据全部重置
  formRef.value?.resetFields()
  // 将事件传递出去，content内部重新发送网络请求
  emit('resetClick')
}

// 查询操作
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="search">
    <!-- 输入搜索关键字的表单 -->
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入查询的部门名称" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入查询的部门领导" v-model="searchForm.leader" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 重置和查询 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick()">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick">查询</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
