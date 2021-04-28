
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
      { path: '/api-searches', component: () => import('src/pages/api-searches/api-searches.vue'), name: "api-searches" },
      { path: '/api-searches/primo-books', component: () => import('src/pages/api-searches/primo-books.vue'), name: "primo-books" },
      { path: '/api-searches/primo-articles', component: () => import('src/pages/api-searches/primo-articles.vue'), name: "primo-articles" },
      { path: '/api-searches/ebsco-asc', component: () => import('src/pages/api-searches/ebsco-asc.vue'), name: "ebsco-asc" },
      { path: '/custom-boxes', component: () => import('pages/custom-boxes.vue'), name: "custom-boxes" },
      { path: '/ebooks/add-ebook', component: () => import('pages/ebooks/add-ebook.vue'), name: "add-ebook" },
      { path: '/ebooks/list-ebooks', component: () => import('pages/ebooks/list-ebooks.vue'), name: "list-ebooks" },
      { path: '/ebooks/edit-ebook', component: () => import('pages/ebooks/edit-ebook.vue'), name: "edit-ebook" },
      { path: '/weblinks/list-weblinks', component: () => import('pages/weblinks/list-weblinks.vue'), name: "list-weblinks" },
      { path: '/weblinks/add-weblink', component: () => import('pages/weblinks/add-weblink.vue'), name: "add-weblink" },
      { path: '/weblinks/edit-weblink', component: () => import('pages/weblinks/edit-weblink.vue'), name: "edit-weblink" },
      { path: '/videos/list-instruction-videos', component: () => import('pages/instruction-videos/list-instruction-videos.vue'), name: "list-instruction-videos" },
      { path: '/videos/add-instruction-video', component: () => import('pages/instruction-videos/add-instruction-video'), name: "add-instruction-video" },
      { path: '/videos/edit-instruction-video', component: () => import('pages/instruction-videos/edit-instruction-video'), name: "edit-instruction-video" },
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
