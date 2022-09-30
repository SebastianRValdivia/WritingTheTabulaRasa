const routes = [
  {
    path: "/",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/IndexPage.vue') },
      { 
        path: "notes/",
        name: "notes",
        component: () => import("src/pages/NoteListPage.vue"),
        children: [
          {
            path: ":identifier/",
            name: "note",
            component: () => import("src/pages/NotePage.vue"),
            props: true
          },
        ]
      },
      {
        path: "calendar/",
        name: "calendar",
        component: () => import("src/pages/CalendarPage"),
      },
      {
        path: "tools/",
        name: "tools",
        component: () => import("src/pages/ToolsPage.vue"),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () => import("pages/ErrorNotFound.vue")
  }
]

export default routes
