import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUser,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    // 用户列表
    usersList: [],
    // 数据总条数
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 查询用户列表
    async postUsersListAction(queryInfo: any) {
      const userListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },

    // 删除用户
    async deleteUserByIdAction(id: number) {
      // 1.删除数据
      const deleteResult = await deleteUserById(id)
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    // 创建用户
    async newUserDataAction(userInfo: any) {
      // 1.创建新用户
      const newResult = await newUserData(userInfo)
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    // 编辑用户
    async editUserAction(id: number, userInfo: any) {
      // 编辑用户
      const editResult = await editUser(id, userInfo)
      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /**针对页面数据，进行增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
