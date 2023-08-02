<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

// 定义自定义事件/接收的属性
interface Iprops {
  searchConfig: {
    labelWidth?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<Iprops>()

// 定义form的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

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
    <el-form
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
      :model="searchForm"
      ref="formRef"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
