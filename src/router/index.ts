import { createRouter, createWebHistory } from 'vue-router'
import { loginRoutes } from './login'
import userRouters from './user/index'
import Layout from '@/layout/Layout.vue'
import { useUserStore } from '@/stores/user'
import { useAuth } from '@/composables/useAuth'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [userRouters, ...loginRoutes],
})

//네비게이터 가드
router.beforeEach((to, from, next) => {
  const { getToken } = useAuth()

  if (to.path === '/login') {
    return next()
  }

  if (!getToken()) {
    alert('토큰이 만료되었습니다. 로그인 해주세요.')
    return next('/login')
  } else {
    return next()
  }
})
