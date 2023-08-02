<script lang="ts" setup>
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
// 当前第几页
const currentPage = ref(1)
// 页面大小（一个页面数据条数）
const pageSize = ref(10)
fetchPageListData()

// 2.获取usersList数据，进行展示
// 因为postUsersListAction()是异步的，如果用const usersList = systemStore.usersList
// 第一次拿到的是一个空数组，有两个解决的办法：
// 1.使用computed   2.使用storeToRefs,把数据解构出来，变成响应式的
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数，用于发送网络请求
function fetchPageListData(formData: any = {}) {
  // 获取offest/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction('department', queryInfo)
}

// 5.编辑和删除的操作
function handleDeleteBtnClick(id: number) {
  systemStore.deletePageByIdAction('department', id)
}
function handleEditBtnClick(row: any) {
  emit('editClick', row)
}

// 6.新建用户的操作
function handleNewUserClick() {
  emit('newClick')
}

defineExpose({ fetchPageListData })
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" width="60" label="序号" align="center" />
        <el-table-column prop="name" width="120" label="部门名称" align="center" />
        <el-table-column prop="leader" width="120" label="部门领导" align="center" />
        <el-table-column prop="parentId" width="150" label="上级部门" align="center" />
        <el-table-column label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button text type="primary" icon="Edit" @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button text type="danger" icon="Delete" @click="handleDeleteBtnClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout=" total, sizes, prev, pager, next, jumper "
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    // 底部对齐
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
  .table {
    :deep(.el-table__cell) {
      padding: 12px 0;
    }

    .el-button {
      margin-left: 0;
      padding: 5px 8px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
