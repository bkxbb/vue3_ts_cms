<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 定义form的数据
const searchForm = reactive({
  // 用户名
  name: '',
  // 真实姓名
  realname: '',
  // 手机号码
  cellphone: '',
  // 状态
  enable: 1,
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
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入查询的用户名" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入查询的真实姓名" v-model="searchForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input placeholder="请输入查询的手机号码" v-model="searchForm.cellphone" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
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
