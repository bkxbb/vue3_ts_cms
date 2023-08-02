import hyRequest from '..'

// 获取全部角色列表
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

// 获取全部部门列表
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}
