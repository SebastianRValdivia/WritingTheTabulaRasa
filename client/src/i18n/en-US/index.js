// This is just an example,
// so you can safely delete all default props below
const general = {
  failed: 'Action failed',
  success: 'Action was successful',
  done: "Done",
  confirm: "Are you sure?",
  delete: "Delete",
  sureDelete: "Are you sure you want to delete this?",
  by: "By",
  empty: "Nothing found",
  noInputFound: "No input found",
  toClipboard: "Added to clipboard",
  edit: "Edit",
  required: "Required",
  continue: "Continue"
}

const mainLayout = {
  compendiums: "Compendiums",
  cheatsheets: "Cheat Sheets",
  encyclopedia: "Encyclopedia",
  guides: "Guides",
  activities: "Activities",
  research: "Research",
  essays: "Essays",
  quizzes: "Quizzes",
  flashcards: "Flashcards",
  practice: "Practice",
  resources: "Resources",
  learnignResources: "Learning resources",
  images: "Images",
  courses: "Courses",
}
const mainDrawer = {
  notes: "My notes",
  permanent: "Permanent",
  fleeting: "Fleeting",
  literary: "Literary",
  tools: "Assistance tools",
  tasks: "Tasks",
  schedule: "Schedule",
  goals: "Goals",
  timeTable: "Time table",
  preferences: "Preferences",
  learningResources: "Learning resources",
  logOut: "Log out",
  practice: "Practice",
}
const toolDrawer = {
  fleetingNote: "New fleeting note",
  timer: "Timer",
  newImage: "New image resource"
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
  content: "Page content",
  presentationImage: "Presentation Image",
  words: "Words",
  characters: "Characters",
}
const encyclopediaListPage = {
  pageTitle: "Encyclopedia"
}
const encyclopediaPage = {
  pageTitle: "",
  content: "Content",
  code: "Code",
  discussion: "Discussion",
  changes: "Changes"
}
const encyclopediaDiscussionPage = {
  continueConversation: "Continue the conversation",
  discussionFor: "Discussion for",
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
const cheatSheetEditorPage = {
  pageTitle: "Edit cheat sheet",
  cheatTitle: "Cheat title",
  sheetTitle: "Sheet title",
  sheetDescription: "A description of the sheet",
}
const fleetingNoteListPage = {
  pageTitle: "My fleeting notes"
}
const literaryNoteListPage = {
  pageTitle: "My literary notes",
  source: "Source"
}
const literaryNoteEditorPage = {
  location: "Location",
  content: "Note Content",
  delete: "This will permanently delete this note!"
}
const noteListPage = {
  pageTitle: "My notes"
}
const noteEditorPage = {
  pageTitle: "New note",
}
const guidesListPage = {
  pageTitle: "Guides"
}
const guideEditorPage = {
  pageTitle: "Guide editor",
  title: "Guide title",
  description: "Guide description",
  stepTitle: "Step title",
  stepContent: "Step content",
}
const quizzesListPage = {
  pageTitle: "Quizzes"
}
const quizzEditorPage = {
  pageTitle: "Quizz editor",
  quizzTitle: "Quizz title",
  question: "Question",
  type: "Type",
  formulation: "Formulation",
  choice: "Choice",
  join: "Join",
  list: "List",
}
const essaysListPage = {
  pageTitle: "Essays",
  by: "By"
}
const essayPage = {
  pageTitle: "Essay",
  autor: "Autor",
}
const essayEditorPage = {
  pageTitle: "Essay editor",
  essayTitle: "Essay title",
  essayBody: "Essay body",
  incompleteData: "Some fields are incomplete",
}
const learningResourcesEditorPage = {
  title: "Title",
  autor: "Autor",
  about: "About",
}
const helpCenterPage = {
  book: "Writing the Tabula Rasa Book"
}
const flashCardListPage = {
  pageTitle: "Flashcards"
}
const flashCardCollectionEditorPage = {
  pageTitle: "Flashcard editor",
  collectionTitle: "Collection title",
  aHint: "Add a hint to trigger the memory",
  correctResponse: "The correct response",
  noCards: "There are no cards in this collection",
}
const flashCardCollectionPage = {
  score: "Score"
}
const practiceRoutineEditorPage = {
  pageTitle: "Practice editor",
  routineTitle: "Routine title",
  exerciseTitle: "Excercice title",
  difficulty: "Difficulty",
  description: "Description",
  overMax: "Over the max"
}
const practiceRoutineUserPage = {
  pageTitle: "Practice routine viewer",
  doNow: "Do routine now",
  neverDone: "You haven't done this before",
}
const practiceRoutinePage = {
  practiceDone: "Practice done",
  savingProgress: "Saving progress"
}
const practiceRoutineListPage = {
  enlisted: "Enlisted"
}
const practiceRoutinePreviewPage = {
  pageTitle: "Practice for",
  noExercises: "There are no exercises in this routine"
}
const timeTableUserPage = {
  monday: "Monday",
  thuesday: "Thuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
  hours: "Hours",
}
const lectureListPage = {
  pageTitle: "Lectures"
}


const imageUploadDialog = {
  caption: "Caption"
}
const metadataEditorDialog = {
  metadata: "Metadata"
}
const quizzPageFormulationQuestion = {
  correctAnswer: "Correct answer",
  yourAnswer: "Your answer",
}
const emptyAlert = {
  noResults: "Nothing found"
}
const noteCard = {
  deleteAll: "This will delete all children cards too"
}
const userBadge = {
  professor: "Professor",
  student: "Student",
}

export default {
  general,

  mainLayout,
  mainDrawer,
  toolDrawer,

  indexPage,
  notePages,
  schedulePage,
  goalNewPage,
  taskListPage,
  toolsPage,
  sheetPage,
  encyclopediaEditorPage,
  encyclopediaListPage,
  encyclopediaPage,
  encyclopediaDiscussionPage,
  researchPage,
  cheatSheetListPage,
  cheatSheetPage,
  cheatSheetEditorPage,
  fleetingNoteListPage,
  literaryNoteListPage,
  literaryNoteEditorPage,
  noteListPage,
  noteEditorPage,
  guidesListPage,
  guideEditorPage,
  quizzesListPage,
  quizzEditorPage,
  essaysListPage,
  essayPage,
  essayEditorPage,
  learningResourcesEditorPage,
  helpCenterPage,
  flashCardListPage,
  flashCardCollectionEditorPage,
  flashCardCollectionPage,
  practiceRoutineEditorPage,
  practiceRoutineUserPage,
  practiceRoutinePage,
  practiceRoutineListPage,
  practiceRoutinePreviewPage,
  timeTableUserPage,
  lectureListPage,

  imageUploadDialog,
  metadataEditorDialog,
  quizzPageFormulationQuestion,
  emptyAlert,
  noteCard,
  userBadge,
}
