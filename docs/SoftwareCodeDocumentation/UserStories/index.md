# User stories of WTR

An user story is a narration where an activity of the software is described by the point of view of an user. Each one narrates how he should start and complete the task he wants to do.

In here we narrate this user stories of the WTR system. We only describe based on the user interface provided by the web client interface (web app and the lite version).

They are classified by task that are only available to a registered user (non admin) and an external visitor (this are activities a registered user can do too).

## Registered user

### Add note

- User opens user menu and click on notes
- User clicks on add new note button
- User enters id of note, the title and the content (id determines the parents)
- User saves the note and can see it in the list

#### Alternative routes

- Note id not available
- User sees a warning and can't save the note

### Add task

- User opens user menu and click on tasks
- User sees a list of his tasks and an input for a new one
- User fills the input and click add button
- User sees the new task listed

#### Alternative routes

- User click on dependency and add an available id

### Add task

- User opens user menu and click on tasks
- User sees a list of his tasks and an input for a new one
- User fills the input and click add button
- User sees the new task listed

### Add research

- User click research link in the navigation bar
- User click on star a new research
- User completes the initial information and objectives of the research
- User click on start research and is redirected to the page

### Add a stage of a research process

- User goes to research page
- User click on add stage
- User completes stage information and click save
- User sees the new stage listed in the research process page

### Add research resource

- User click research link in the navigation bar
- User goes to the research he is working on
- User click on add resource 
- User fill the resource information and description
- User click on save the resource and it's added to the research

### Add cheat sheet

- User goes to cheat sheet list from the navigation bar
- User click on add button
- User goes to new cheat sheet page
- User inputs title and some cheat
- User saves cheat sheet

### Add activity

- User goes to activity page
- User click on new activity button
- User fills the activities exercises
- User saves the activity

### Complete task

- User opens user menu and click on tasks
- User click on the check mark to complete task

### Do activity

- User click on the activity he wants to do
- User answers the quizzes questions
- User click finish
- User sees result and time expend

### Delete note

- User opens user menu and click on notes
- User find the note it wants to delete in the list of notes
- User click note and sees the delete button
- User click the delete button and is ask to confirm
- User confirms and note is deleted, children are moved one level above

### Delete a research

- User goes to the research page
- User click on delete research button
- User is prompted with a confirmation
- User confirms an confirms and deletes the research

### Delete task

- User opens user menu and click on tasks
- User find the task it wants to delete in the list of tasks
- User clicks on delete button and is ask to confirm
- User confirms and task is deleted 

### Delete cheat sheet

- User goes to cheat sheet page
- User click on edit button
- User sees edition of cheat sheet page
- User click on delete sheet
- User is prompted with a confirmation
- User confirm and deletes the cheat sheet

### Delete a cheat

- User goes to cheat sheet page
- User click on edit button
- User sees edition of sheet
- User click on delete button of a cheat
- User is prompted with a confirmation
- User confirm and deletes the cheat

### Log In

- User comes to site and sees the log in link in the navigation bar
- User click in the log in link and is required to log in form
- User completes the username and password fields and clicks log in
- User is redirected to home and sees the button to access the user menu in the navigation bar

### Log out

- User goes to the user menu and sees the log out button
- User click the button and is redirected to home and has no access to any user activities

### Modify note

- User opens user menu and click on notes
- User click in the note he wants to modify from the list
- User click edit mode and can see editing tools (except for id)
- User modify content or title and click on save
- User sees note with the new content

### Modify cheat sheet

- User open the cheat sheet page
- User click on the sheet he wants to modify
- User enters the editor page with the sheet data
- User does the modification and click saves
- User is redirected to the preview page of the sheet with the new modification

### Modify encyclopedia page

- User opens encyclopedia page 
- User click on edit button
- User enter the editor with the current page data
- User does the modification and click saves
- User is redirected to the preview page of the encyclopedia with the new modification

### Visit notes 

- User opens user menu and click on notes
- User sees a list of his notes
- User clicks one and is prompted by the note id, title and content

## Visitor

### View encyclopedia page

- User click on encyclopedia link from the navigation bar
- User sees a list of recent pages and search tools
- User finds the one he wants to read and click on it
- User is redirected to the view of the encyclopedia page

### View cheat sheet

- User click on cheat sheets link from the navigation bar
- User sees a list of cheat sheets and click on the one he want to see
- User is redirected to the view of the cheat sheets 

### View research process

- User clicks on research link from the navigation bar and sees a list of researches
- User search a particular research process and click it
- User sees research information and steps
- User sees resources used for the research process

### View bibliographic resources

- User clicks on resources from the navigation bar
- User select explore books
- User sees a list of books used in the system
