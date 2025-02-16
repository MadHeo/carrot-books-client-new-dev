import Layout from '@/layout/Layout.vue'
import BookDetail from '@/views/detail/BookDetail.vue'
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
    {
      path: '/detail/:id',
      component: BookDetail,
      name: 'BookDetail',
    },

    // ...subs
  ],
}
