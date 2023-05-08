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
        name: "noteListPage",
        component: () => import("src/pages/NoteListPage"),
      },
      {
        path: "my/notes/permanent/editor/",
        name: "noteEditorPage",
        component: () => import("src/pages/NoteEditorPage"),
      },
      {
        path: "my/notes/fleeting/",
        name: "fleetingNotesListPage",
        component: () => import("src/pages/FleetingNoteListPage"),
      },
      {
        path: "my/notes/literary/",
        name: "literaryNoteListPage",
        component: () => import("src/pages/LiteraryNoteListPage"),
      },
      {
        path: "my/notes/literary/editor/:id?/",
        name: "literaryNoteEditorPage",
        component: () => import("src/pages/LiteraryNoteEditorPage"),
        props: true,
      },
      {
        path: "my/tasks/",
        name: "tasks",
        component: () => import("src/pages/TaskListPage"),
      },
      {
        path: "my/goals/",
        name: "goalsListPage",
        component: () => import("src/pages/GoalListPage"),
      },
      {
        path: "my/goals/new/",
        name: "goalNewPage",
        component: () => import("src/pages/GoalNewPage"),
      },
      {
        path: "my/goals/:id/",
        name: "goalsPage",
        component: () => import("src/pages/GoalPage"),
        props: true,
      },
      {
        path: "my/timetable/",
        name: "timeTableUserPage",
        component: () => import("src/pages/TimeTableUserPage"),
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
        path: "my/practices/",
        name: "practiceRoutineUserListPage",
        component: () => import("src/pages/PracticeRoutineUserListPage"),
      },
      {
        path: "my/practices/:id/",
        name: "practiceRoutineUserPage",
        component: () => import("src/pages/PracticeRoutineUserPage"),
        props: true,
      },
      {
        path: "practice/editor/",
        name: "practiceRoutineEditorPage",
        component: () => import("src/pages/PracticeRoutineEditorPage"),
      },
      {
        path: "practice/",
        name: "practiceRoutineListPage",
        component: () => import("src/pages/PracticeRoutineListPage"),
      },
      {
        path: "practice/:id/",
        name: "practiceRoutinePage",
        component: () => import("src/pages/PracticeRoutinePage"),
        props: true,
      },
      {
        path: "practice/preview/:id/",
        name: "practiceRoutinePreviewPage",
        component: () => import("src/pages/PracticeRoutinePreviewPage"),
        props: true,
      },
      {
        path: "cheatsheets/",
        name: "cheatsheetListPage",
        component: () => import ("src/pages/CheatsheetListPage"),
      },
      {
        path: "cheatsheets/editor/:url?/",
        name: "cheatsheetEditor",
        component: () => import ("src/pages/CheatsheetEditorPage"),
        props: true
      },
      {
        path: "cheatsheets/page/:url/",
        name: "cheatsheet",
        component: () => import("src/pages/CheatsheetPage"),
        props: true
      },
      {
        path: "encyclopedia/",
        name: "encyclopediaListPage",
        component: () => import("src/pages/EncyclopediaListPage"),
      },
      {
        path: "encyclopedia/editor/",
        name: "encyclopediaEditor",
        component: () => import("src/pages/EncyclopediaEditorPage")
      },
      {
        path: "encyclopedia/page/:url",
        name: "encyclopediaPage",
        component: () => import("src/pages/EncyclopediaPage"),
        props: true
      },
      {
        path: "research/",
        name: "researchListPage",
        component: () => import("src/pages/ResearchListPage"),
      },
      {
        path: "research/:id/",
        name: "researchPage",
        component: () => import("src/pages/ResearchPage"),
        props: true
      },
      {
        path: "guides/",
        name: "guideListPage",
        component: () => import("src/pages/GuideListPage")
      },
      {
        path: "guides/:url/",
        name: "guidePage",
        component: () => import("src/pages/GuidePage"),
        props: true
      },
      {
        path: "guides/editor/",
        name: "guideEditor",
        component: () => import("src/pages/GuideEditorPage")
      },
      {
        path: "essays/",
        name: "essayListPage",
        component: () => import("src/pages/EssayListPage")
      },
      {
        path: "essays/editor/:url?/",
        name: "essayEditorPage",
        component: () => import("src/pages/EssayEditorPage"),
        props: true,
      },
      {
        path: "essays/:url/",
        name: "essayPage",
        component: () => import("src/pages/EssayPage"),
        props: true
      },
      {
        path: "quizzes/",
        name: "quizzesListPage",
        component: () => import("src/pages/QuizzListPage")
      },
      {
        path: "quizzes/:id/",
        name: "quizzPage",
        component: () => import("src/pages/QuizzPage"),
        props: true
      },
      {
        path: "quizzes/editor/",
        name: "quizzEditorPage",
        component: () => import("src/pages/QuizzEditorPage")
      },
      {
        path: "flashcards/",
        name: "flashCardCollectionListPage",
        component: () => import("src/pages/FlashCardCollectionListPage")
      },
      {
        path: "flashcards/:id/",
        name: "flashCardCollectionPage",
        component: () => import("src/pages/FlashCardCollectionPage"),
        props: true
      },
      {
        path: "flashcards/editor/:id?/",
        name: "flashCardCollectionEditorPage",
        component: () => import("src/pages/FlashCardCollectionEditorPage"),
        props: true
      },
      {
        path: "my/learning-resources/",
        name: "learningResourceUserListPage",
        component: () => import("src/pages/LearningResourceUserListPage")
      },
      {
        path: "my/learning-resources/editor/",
        name: "learningResourcesEditor",
        component: () => import("src/pages/LearningResourceEditorPage")
      },
      {
        path: "image-resources/",
        name: "imageResourceListPage",
        component: () => import("src/pages/ImageResourceListPage")
      },
      {
        path: "learning-resources/",
        name: "learningResourceListPage",
        component: () => import("src/pages/LearningResourceListPage")
      },
      {
        path: "help-center/",
        name: "helpCenterPage",
        component: () => import("src/pages/HelpCenterPage.vue"),
        children: [
          { 
            path: "book/",
            name: "bookReaderPage",
            component: () => import("src/pages/HelpCenterPage/BookReaderPage") 
          },
        ]
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "notFound",
    component: () => import("pages/ErrorNotFound")
  }
]

export default routes
