import DefaultLayout from '@/layout/DefaultLayout.vue'
import HomeView from '@/modules/home/HomeView.vue'
import DashboardView from '@/modules/dashboard/DashboardView.vue'
import ProductsView from '@/modules/products/ProductsView.vue'
import TodosView from '@/modules/todos/TodosView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue';
import UserDashboard from '@/components/UserDashboard.vue';
import { getCurrentUserId } from '@/api/users';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Login', component: LoginForm },
    { 
      path: '/dashboard',
      name: 'Dashboard',
      component: UserDashboard,
      beforeEnter: () => {
        if (!getCurrentUserId()) return '/';
      }
    },
  ],
})

export default router
