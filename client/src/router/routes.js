
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: "",
        name: "home",
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: "my/notes/permanent/",
        name: "noteListPage",
        component: () => import("src/pages/NoteListPage.vue"),
      },
      {
        path: "my/notes/permanent/editor/",
        name: "noteEditorPage",
        component: () => import("src/pages/NoteEditorPage.vue"),
      },
      {
        path: "my/notes/fleeting/",
        name: "fleetingNotesListPage",
        component: () => import("src/pages/FleetingNoteListPage.vue"),
      },
      {
        path: "my/notes/literary/",
        name: "literaryNoteListPage",
        component: () => import("src/pages/LiteraryNoteListPage.vue"),
      },
      {
        path: "my/notes/literary/editor/:id?/",
        name: "literaryNoteEditorPage",
        component: () => import("src/pages/LiteraryNoteEditorPage.vue"),
        props: true,
      },
      {
        path: "my/tasks/",
        name: "tasks",
        component: () => import("src/pages/TaskListPage.vue"),
      },
      {
        path: "my/goals/",
        name: "goalsListPage",
        component: () => import("src/pages/GoalListPage.vue"),
      },
      {
        path: "my/goals/new/",
        name: "goalNewPage",
        component: () => import("src/pages/GoalNewPage.vue"),
      },
      {
        path: "my/goals/:id/",
        name: "goalsPage",
        component: () => import("src/pages/GoalPage.vue"),
        props: true,
      },
      {
        path: "my/timetable/",
        name: "timeTableUserPage",
        component: () => import("src/pages/TimeTableUserPage.vue"),
      },
      {
        path: "my/tools/",
        name: "tools",
        component: () => import("src/pages/ToolsPage.vue"),
      },
      {
        path: "my/preferences/",
        name: "preferences",
        component: () => import("src/pages/UserPreferencesPage.vue"),
      },
      {
        path: "my/practices/",
        name: "practiceRoutineUserListPage",
        component: () => import("src/pages/PracticeRoutineUserListPage.vue"),
      },
      {
        path: "my/practices/:id/",
        name: "practiceRoutineUserPage",
        component: () => import("src/pages/PracticeRoutineUserPage.vue"),
        props: true,
      },
      {
        path: "practice/editor/",
        name: "practiceRoutineEditorPage",
        component: () => import("src/pages/PracticeRoutineEditorPage.vue"),
      },
      {
        path: "practice/",
        name: "practiceRoutineListPage",
        component: () => import("src/pages/PracticeRoutineListPage.vue"),
      },
      {
        path: "practice/:id/",
        name: "practiceRoutinePage",
        component: () => import("src/pages/PracticeRoutinePage.vue"),
        props: true,
      },
      {
        path: "practice/preview/:id/",
        name: "practiceRoutinePreviewPage",
        component: () => import("src/pages/PracticeRoutinePreviewPage.vue"),
        props: true,
      },
      {
        path: "cheatsheets/",
        name: "cheatsheetListPage",
        component: () => import ("src/pages/CheatsheetListPage.vue"),
      },
      {
        path: "cheatsheets/editor/:url?/",
        name: "cheatsheetEditor",
        component: () => import ("src/pages/CheatsheetEditorPage.vue"),
        props: true
      },
      {
        path: "cheatsheets/page/:url/",
        name: "cheatsheet",
        component: () => import("src/pages/CheatsheetPage.vue"),
        props: true
      },
      {
        path: "encyclopedia/",
        name: "encyclopediaListPage",
        component: () => import("src/pages/EncyclopediaListPage.vue"),
      },
      {
        path: "encyclopedia/editor/",
        name: "encyclopediaEditor",
        component: () => import("src/pages/EncyclopediaEditorPage.vue")
      },
      {
        path: "encyclopedia/page/:url/",
        name: "encyclopediaPage",
        component: () => import("src/pages/EncyclopediaPage.vue"),
        props: true,
        children: [
          {
            path: "",
            name: "encyclopediaContentPage",
            component: () => import(
              "src/pages/EncyclopediaPage/EncyclopediaContentPage.vue"
            ),
            props: true,
          },
          {
            path: "discussion/",
            name: "encyclopediaDiscussionPage",
            component: () => import(
              "src/pages/EncyclopediaPage/EncyclopediaDiscussionPage.vue"
            ),
            props: true,
          },
          {
            path: "code/",
            name: "encyclopediaCodePage",
            component: () => import(
              "src/pages/EncyclopediaPage/EncyclopediaCodePage.vue"
            ),
            props: true,
          }
        ]
      },
      {
        path: "research/",
        name: "researchListPage",
        component: () => import("src/pages/ResearchListPage.vue"),
      },
      {
        path: "research/:id/",
        name: "researchPage",
        component: () => import("src/pages/ResearchPage.vue"),
        props: true
      },
      {
        path: "guides/",
        name: "guideListPage",
        component: () => import("src/pages/GuideListPage.vue")
      },
      {
        path: "guides/:url/",
        name: "guidePage",
        component: () => import("src/pages/GuidePage.vue"),
        props: true
      },
      {
        path: "guides/editor/",
        name: "guideEditor",
        component: () => import("src/pages/GuideEditorPage.vue")
      },
      {
        path: "essays/",
        name: "essayListPage",
        component: () => import("src/pages/EssayListPage.vue")
      },
      {
        path: "essays/editor/:url?/",
        name: "essayEditorPage",
        component: () => import("src/pages/EssayEditorPage.vue"),
        props: true,
      },
      {
        path: "essays/:url/",
        name: "essayPage",
        component: () => import("src/pages/EssayPage.vue"),
        props: true
      },
      {
        path: "quizzes/",
        name: "quizzesListPage",
        component: () => import("src/pages/QuizzListPage.vue")
      },
      {
        path: "quizzes/:id/",
        name: "quizzPage",
        component: () => import("src/pages/QuizzPage.vue"),
        props: true
      },
      {
        path: "quizzes/editor/",
        name: "quizzEditorPage",
        component: () => import("src/pages/QuizzEditorPage.vue")
      },
      {
        path: "flashcards/",
        name: "flashCardCollectionListPage",
        component: () => import("src/pages/FlashCardCollectionListPage.vue")
      },
      {
        path: "flashcards/:id/",
        name: "flashCardCollectionPage",
        component: () => import("src/pages/FlashCardCollectionPage.vue"),
        props: true
      },
      {
        path: "flashcards/editor/:id?/",
        name: "flashCardCollectionEditorPage",
        component: () => import("src/pages/FlashCardCollectionEditorPage.vue"),
        props: true
      },
      {
        path: "my/learning-resources/",
        name: "learningResourceUserListPage",
        component: () => import("src/pages/LearningResourceUserListPage.vue")
      },
      {
        path: "learning-resources/editor/",
        name: "learningResourcesEditorPage",
        component: () => import("src/pages/LearningResourceEditorPage.vue")
      },
      {
        path: "gallery/",
        name: "imageListPage",
        component: () => import("src/pages/ImageListPage.vue")
      },
      {
        path: "learning-resources/",
        name: "learningResourceListPage",
        component: () => import("src/pages/LearningResourceListPage.vue")
      },
      {
        path: "help-center/",
        name: "helpCenterPage",
        component: () => import("src/pages/HelpCenterPage.vue"),
        children: [
          {
            path: "book/",
            name: "bookReaderPage",
            component: () => import("src/pages/HelpCenterPage/BookReaderPage.vue")
          },
        ]
      },
      {
        path: "courses/",
        name: "courseListPage",
        component: () => import("src/pages/CourseListPage.vue")
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
