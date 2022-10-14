// This is just an example,
// so you can safely delete all default props below
const mainDrawer = {
  notes: "My notes",
  tools: "Assistance tools",
  tasks: "Tasks",
  calendar: "Calendar",
}

const notePages = {
  permanent: "Permanent",
  fleeting: "Fleeting",
  literary: "Literary",
  fleetingNotes: "Fleeting notes",
  empty: "There are no notes yet",
}
const schedulePage = {
  noGoals: "No goals yet",
  calendar: "Calendar",
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

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  mainDrawer,
  notePages,
  schedulePage,
  taskListPage,
  toolPage,

}
