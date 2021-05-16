const makeRoutes = (store) => {
  const routes = [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {path: '',name:'index', component: () => import('pages/Index')},
        {path: 'cart', component: () => import('pages/cart.vue')},
        {path: 'auth', component: () => import('pages/auth.vue')},
        {path: 'lk', component: () => import('pages/lk.vue')},
        {path: 'lk-personal', component: () => import('pages/lk-personal.vue')},
        {path: 'lk-delivery', component: () => import('pages/lk-delivery.vue')},
        {path: 'checkout', component: () => import('pages/checkout.vue')},
        {path: 'promo', component: () => import('pages/promotion.vue')},
        {path: 'info', component: () => import('pages/info.vue')},
      ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '*',
      component: () => import('pages/Error404.vue')
    }
  ]
  return routes
}
export default makeRoutes
