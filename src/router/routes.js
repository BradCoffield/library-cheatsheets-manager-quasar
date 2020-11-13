
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/list-cheatsheets', component: () => import('pages/list-cheatsheets.vue') },
      { path: '/create-cheatsheet', component: () => import('pages/create-cheatsheet.vue') },
      { path: '/edit-cheatsheet', component: () => import('pages/edit-cheatsheet.vue'), name: "edit-cheatsheet" },
      { path: '/api-searches', component: () => import('pages/api-searches.vue'), name: "api-searches" },
      // { path: '/api-searches/ebsco-asc', component: () => import('pages/api-searches/ebsco-asc.vue'), name: "api-searches" }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
