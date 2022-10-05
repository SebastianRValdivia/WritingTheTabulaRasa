const routes = [
  {
    path: "/",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "", component: () => import('pages/IndexPage.vue') },
      { 
        path: "notes/permanent/",
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
        path: "notes/fleeting/",
        name: "fleetingNotes",
        component: () => import("src/pages/FleetingNoteListPage.vue"),
      },
      {
        path: "notes/literary/",
        name: "literaryNotes",
        component: () => import("src/pages/NoteListPage.vue"),
      },
      {
        path: "tasks/",
        name: "tasks",
        component: () => import("src/pages/TaskListPage"),
      },
      {
        path: "schedules/",
        name: "schedules",
        component: () => import("src/pages/SchedulePage"),
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
