const routes = [
  {
    path: '/',
    redirect: { name: 'Hyxc' },
  },
  {
    path: '/naxida',
    name: 'Naxida',
    component: () => import('@/views/Home/NaxidaView.vue'),
  },
  {
    path: '/hyxc',
    name: 'Hyxc',
    component: () => import('@/views/Home/HyxcView.vue'),
  },
];

export default routes;