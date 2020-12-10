
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/list-cheatsheets', component: () => import('pages/cheatsheets/list-cheatsheets.vue') },
      { path: '/create-cheatsheet', component: () => import('pages/cheatsheets/create-cheatsheet.vue') },
      { path: '/edit-cheatsheet', component: () => import('pages/cheatsheets/edit-cheatsheet.vue'), name: "edit-cheatsheet" },
      { path: '/api-searches', component: () => import('pages/api-searches.vue'), name: "api-searches" },
      { path: '/custom-boxes', component: () => import('pages/custom-boxes.vue'), name: "custom-boxes" },
      { path: '/ebooks/add-ebook', component: () => import('pages/ebooks/add-ebook.vue'), name: "add-ebook" },
      { path: '/ebooks/list-ebooks', component: () => import('pages/ebooks/list-ebooks.vue'), name: "list-ebooks" },
      { path: '/videos/list-instruction-videos', component: () => import('pages/instruction-videos/list-instruction-videos.vue'), name: "list-instruction-videos" },
      { path: '/videos/add-instruction-video', component: () => import('pages/instruction-videos/add-instruction-video'), name: "add-instruction-video" },
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
