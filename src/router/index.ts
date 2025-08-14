import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/modules/Login/LoginForm.vue';
import UserDashboard from '@/modules/dashboard/UserDashboard.vue';
import api from '@/api';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Login', component: LoginForm },
    { 
      path: '/dashboard',
      name: 'Dashboard',
      component: UserDashboard,
      beforeEnter: () => {
        if (!api.users.getCurrentUserId()) return '/';
      }
    },
  ],
})

export default router
