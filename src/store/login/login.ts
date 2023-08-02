import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  // 如何指定state的类型
  state: (): ILoginState => ({
    // （??）是一种称为"空值合并运算符",它的作用是判断一个表达式的结果是否为 null 或 undefined，
    // 如果是，则返回该表达式的默认值，否则返回表达式的结果。
    // 这里如果没有找到该值或者值为 null 或 undefined，那么 ?? 运算符将返回一个空字符串 (‘’)。
    token: '',
    userInfo: {},
    userMenus: []
  }),

  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息（role信息）
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限（菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5.请求所有的角色与部门数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要：动态的添加路由
      // 获取
      const routes = mapMenusToRoutes(userMenus)
      // 添加
      routes.forEach((route) => router.addRoute('main', route))

      // 6.页面跳转（main页面）
      router.push('/main')
    },

    // 用户进行刷新：判断用户是否登录以及是否包含userMenus菜单
    loadLocalCacheAction() {
      // 用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 请求所有的角色与部门数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 动态添加路由
        // 获取
        const routes = mapMenusToRoutes(userMenus)
        // 添加
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
