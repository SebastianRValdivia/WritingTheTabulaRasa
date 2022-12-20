// This is just an example,
// so you can safely delete all default props below
const mainLayout = {
  compendiums: "Compendiums",
  cheatsheets: "Cheat Sheets",
  encyclopedia: "Encyclopedia",
  guides: "Guides",
}
const mainDrawer = {
  notes: "My notes",
  tools: "Assistance tools",
  tasks: "Tasks",
  calendar: "Calendar",
  preferences: "Preferences",
  logOut: "Log out",
}

const indexPage = {
  pageTitle: "Writing The Tabula Rasa"
}
const notePages = {
  permanent: "Permanent",
  fleeting: "Fleeting",
  literary: "Literary",
  fleetingNotes: "Fleeting notes",
  empty: "There are no notes yet",
}
const schedulePage = {
  pageTitle: "My schedule",
  empty: "No goals yet",
  calendar: "Calendar",
}
const goalNewPage = {
  pageTitle: "New goal",
  error: "Incomplete data"
}
const taskListPage = {
  pageTitle: "My tasks",
  showCompleted: "Show completed",
  requiredWrong: "Required task doesn't exist",
  requiredIncomplete: "Required task is incomplete",
  deleteTask: "Delete task",
  deleteTaskTip: "Deleting a task will completely any traces of it. Are you sure?",
  taskDeleted: "Task Deleted"
}
const toolsPage = {
  pageTitle: "My tools",
  pomoWorkTime: "Work interval",
  pomoRestTime: "Rest interval"
}
const sheetPage = {
  pageTitle: "Sheet",
  noSheets: "No cheat sheets yet"
}
const encyclopediaEditorPage = {
  pageTitle: "New page",
  title: "Page title",
  epigraph: "Epigraph",
  content: "Page content"
}
const encyclopediaListPage = {
  pageTitle: "Encyclopedia"
}
const researchPage = {
  pageTitle: "Research",
  startDate: "Start date"
}
const cheatSheetListPage = {
  pageTitle: "Cheat sheets"
}
const cheatSheetPage = {
  pageTitle: "Cheat sheet"
}
const cheatSheetNewPage = {
  pageTitle: "New cheat sheet"
}
const fleetingNoteListPage = {
  pageTitle: "My fleeting notes"
}
const literaryNoteListPage = {
  pageTitle: "My literary notes"
}
const noteListPage = {
  pageTitle: "My notes"
}
const guidesListPage = {
  pageTitle: "Guides"
}

const imageUploadDialog = {
  caption: "Caption"
}

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  done: "Done",
  confirm: "Confirm",
  sureDelete: "Are you sure you want to delete this?",

  mainLayout,
  mainDrawer,

  indexPage,
  notePages,
  schedulePage,
  goalNewPage,
  taskListPage,
  toolsPage,
  sheetPage,
  encyclopediaEditorPage,
  encyclopediaListPage,
  researchPage,
  cheatSheetListPage,
  cheatSheetPage,
  cheatSheetNewPage,
  fleetingNoteListPage,
  literaryNoteListPage,
  noteListPage,
  guidesListPage,

  imageUploadDialog,

}
