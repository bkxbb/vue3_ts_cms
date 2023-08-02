<script lang="ts" setup>
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

// 1.定义对话框是否可见
const dialogVisible = ref(false)

// 2.定义表单数据
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref()

// 3.获取角色与部门数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 4.定义设置可见性方法
function setModalVisible(isnew: boolean = true, itemData?: any) {
  dialogVisible.value = true
  isNewRef.value = isnew

  if (!isnew && itemData) {
    // 编辑框数据回显
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
// 5.点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑数据
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 创建新的部门
    systemStore.newPageDataAction('department', formData)
  }
}

// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导"></el-input>
          </el-form-item>
          <el-form-item label="选择部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
