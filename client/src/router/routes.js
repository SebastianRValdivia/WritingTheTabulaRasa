const routes = [
  {
    path: "/",
    component: () => import('layouts/MainLayout'),
    children: [
      { 
        path: "",
        name: "home",
        component: () => import('pages/IndexPage') 
      },
      { 
        path: "notes/permanent/",
        name: "notes",
        component: () => import("src/pages/NoteListPage"),
        children: [
          {
            path: ":identifier/",
            name: "note",
            component: () => import("src/pages/notes/NotePage"),
            props: true
          },
          {
            path: "new/",
            name: "newNote",
            component: () => import ("src/pages/notes/NewNotePage")
          }
        ]
      },
      {
        path: "notes/fleeting/",
        name: "fleetingNotes",
        component: () => import("src/pages/FleetingNoteListPage"),
      },
      {
        path: "notes/literary/",
        name: "literaryNotes",
        component: () => import("src/pages/NoteListPage"),
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
        component: () => import("src/pages/ToolsPage"),
      },
      {
        path: "cheatsheets/",
        name: "cheatsheets",
        component: () => import ("src/pages/CheatsheetListPage")
      },
      {
        path: "cheatsheets/:title/",
        name: "cheatsheet",
        component: () => import("src/pages/CheatsheetPage"),
        props: true
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () => import("pages/ErrorNotFound")
  }
]

export default routes
