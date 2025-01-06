import Layout from '@/layout/Layout.vue'
import Home from '@/views/main/Home.vue'

export default {
  path: '/',
  name: 'root',
  redirect: '/main',
  component: Layout,
  children: [
    {
      path: '/main',
      component: Home,
      name: 'Main',
    },
    // ...subs
  ],
}
