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
      },
      {
        path: "notes/fleeting/",
        name: "fleetingNotes",
        component: () => import("src/pages/FleetingNoteListPage"),
      },
      {
        path: "notes/literary/",
        name: "literaryNotes",
        component: () => import("src/pages/LiteraryNoteListPage"),
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
        path: "schedules/new/",
        name: "newSchedule",
        component: () => import("src/pages/GoalNewPage"),
      },
      {
        path: "tools/",
        name: "tools",
        component: () => import("src/pages/ToolsPage"),
      },
      {
        path: "cheatsheets/",
        name: "cheatsheets",
        component: () => import ("src/pages/CheatsheetListPage"),
      },
      {
        path: "cheatsheets/new/",
        name: "newCheatsheet",
        component: () => import ("src/pages/CheatsheetNewPage")

      },
      {
        path: "cheatsheets/:title/",
        name: "cheatsheet",
        component: () => import("src/pages/CheatsheetPage"),
        props: true
      },
      {
        path: "encyclopedia/",
        name: "encyclopediaIndex",
        component: () => import("src/pages/EncyclopediaListPage"),
      },
      {
        path: "encyclopedia/page/:title",
        name: "encyclopediaPage",
        component: () => import("src/pages/EncyclopediaPage"),
        props: true
      },
      {
        path: "preferences/",
        name: "preferences",
        component: () => import("src/pages/UserPreferencesPage"),
      }
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
