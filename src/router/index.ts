import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系： path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 动态添加路由：1.基于角色的动态路由 2.基于菜单的动态路由（好一点）

// 导航守卫
// 参数：to(跳转到的位置) from(从哪里跳转过来)
// 返回值：返回值决定导航的路径（不返回或者返回undefined,默认跳转）
router.beforeEach((to) => {
  // 只有登录成功（有token），才能真正进入main里面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
