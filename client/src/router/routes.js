const routes = [
  {
    path: "/",
    component: () => import('layouts/MainLayout'),
    children: [
      { path: "",
        name: "home",
        component: () => import('pages/IndexPage') 
      },
      { 
        path: "my/notes/permanent/",
        name: "notes",
        component: () => import("src/pages/NoteListPage"),
      },
      {
        path: "my/notes/fleeting/",
        name: "fleetingNotes",
        component: () => import("src/pages/FleetingNoteListPage"),
      },
      {
        path: "my/notes/literary/",
        name: "literaryNotes",
        component: () => import("src/pages/LiteraryNoteListPage"),
      },
      {
        path: "my/tasks/",
        name: "tasks",
        component: () => import("src/pages/TaskListPage"),
      },
      {
        path: "my/schedules/",
        name: "schedules",
        component: () => import("src/pages/SchedulePage"),
      },
      {
        path: "my/schedules/new/",
        name: "newSchedule",
        component: () => import("src/pages/GoalNewPage"),
      },
      {
        path: "my/tools/",
        name: "tools",
        component: () => import("src/pages/ToolsPage"),
      },
      {
        path: "my/preferences/",
        name: "preferences",
        component: () => import("src/pages/UserPreferencesPage"),
      },
      {
        path: "cheatsheets/",
        name: "cheatsheets",
        component: () => import ("src/pages/CheatsheetListPage"),
      },
      {
        path: "cheatsheets/editor/:url?/",
        name: "cheatsheetEditor",
        component: () => import ("src/pages/CheatsheetEditorPage"),
        props: true
      },
      {
        path: "cheatsheets/:url/",
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
        path: "encyclopedia/editor/",
        name: "encyclopediaEditor",
        component: () => import("src/pages/EncyclopediaEditorPage")
      },
      {
        path: "encyclopedia/page/:title",
        name: "encyclopediaPage",
        component: () => import("src/pages/EncyclopediaPage"),
        props: true
      },
      {
        path: "research/:id",
        name: "researchPage",
        component: () => import("src/pages/ResearchPage"),
        props: true
      },
      {
        path: "guides/:url/",
        name: "guidePage",
        component: () => import("src/pages/GuidePage"),
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
