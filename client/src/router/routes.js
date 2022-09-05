
const routes = [
  {
    path: "/",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/IndexPage.vue') },
      { 
        path: "/notes/",
        component: () => import("src/pages/NoteListPage.vue"),
      },
      {
        path: "/notes/:id",
        component: () => import("src/pages/NotePage.vue"),
        props: true
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
]

export default routes
