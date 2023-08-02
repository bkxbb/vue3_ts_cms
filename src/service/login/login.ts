import hyRequest from '..'
import type { IAccount } from '@/types'

// 用户账号登录
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 查询某个用户信息
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

// 查询角色菜单树
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
