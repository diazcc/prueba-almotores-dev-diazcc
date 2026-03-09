import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import axios from 'axios';

const Login = () => import('./components/pages/login/Login.page.vue');
const Home = () => import('./components/pages/home/Home.page.vue');
const Dashboard = () => import('./components/pages/dashboard/Dashboard.page.vue');

// Guard para verificar autenticación
const authGuard = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('idToken');
  
  // Configurar axios con el token si existe
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  // Si va a login y está autenticado, redirige a dashboard
  if (to.path === '/login' && token) {
    next('/home/dashboard');
  } 
  // Si va a rutas protegidas y no está autenticado, redirige a login
  else if (to.meta.requiresAuth && !token) {
    next('/login');
  } 
  else {
    next();
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      const token = localStorage.getItem('idToken');
      return token ? '/home/dashboard' : '/login';
    }
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: authGuard
  },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true },
    beforeEnter: authGuard,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const token = localStorage.getItem('idToken');
      return token ? '/home/dashboard' : '/login';
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;