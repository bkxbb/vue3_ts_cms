<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(formData: any) {
  // !号表示非空断言，表示一定有值，？号表示可选链
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
function handleEditBtnClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
