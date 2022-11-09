// This is just an example,
// so you can safely delete all default props below
const mainLayout = {
  cheatsheets: "Cheat Sheets",
  encyclopedia: "Encyclopedia"
}
const mainDrawer = {
  notes: "My notes",
  tools: "Assistance tools",
  tasks: "Tasks",
  calendar: "Calendar",
  preferences: "Preferences",
}

const notePages = {
  permanent: "Permanent",
  fleeting: "Fleeting",
  literary: "Literary",
  fleetingNotes: "Fleeting notes",
  empty: "There are no notes yet",
}
const schedulePage = {
  empty: "No goals yet",
  calendar: "Calendar",
}
const goalNewPage = {
  error: "Incomplete data"
}
const taskListPage = {
  showCompleted: "Show completed",
  requiredWrong: "Required task doesn't exist",
  requiredIncomplete: "Required task is incomplete",
}
const toolPage = {
  pomoWorkTime: "Work interval",
  pomoRestTime: "Rest interval"
}
const sheetPage = {
  noSheets: "No cheat sheets yet"
}

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  done: "Done",
  confirm: "Confirm",
  sureDelete: "Are you sure you want to delete this?",
  mainLayout,
  mainDrawer,
  notePages,
  schedulePage,
  goalNewPage,
  taskListPage,
  toolPage,
  sheetPage,

}
