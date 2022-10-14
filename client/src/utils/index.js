export function filterNoteFamily(noteList, identifierList) {
  let parentNote
  let noteFamily = []
  for (let index = 0; index < identifierList.length; index++) {
    if (index == 0) { // Root level, first run
      // Find note in noteList
      parentNote = noteList.find(
        // Filter all notes with same identifier and id of parent null for root
        (note) => noteList.filter(
          (note) => (
            note.identifier === Number(identifierList[index]) &&
            note.parent === null
            )
        ).includes(note)
      )
      // Save note in list
      noteFamily.push(parentNote)
    } else { // After the root lever 
      parentNote = noteList.find(
        // Filter all notes with same identifier and id of parent 
        (note) => noteList.filter(
          (note) => 
            (
              note.identifier === Number(identifierList[index]) && 
              note.parent === parentNote.id
            )
          ).includes(note)
        )
      noteFamily.push(parentNote)
    }
  }
  return noteFamily // Returns family in same order as the identifier
}

export function createNoteIdentifier(objectiveNote, noteList, identifierList) {
  if (objectiveNote.parent === null) { // Last note was root level
    return identifierList.join("-") // Arrange the identifier divided by -
  } else {
    // Find the parent of the objective note
    let parentNote = noteList.find((note) => note.id === objectiveNote.parent)
    // Call function again with updated data
    return createNoteIdentifier(
      parentNote,
      noteList,
      [String(parentNote.identifier), ...identifierList]
    )
  }
}

export function constructNoteTree(noteList) {
  let arrangedNoteTree // The arranged in parent/child tree
  let rootNotes = noteList.filter((note) => note.parent === null) // Grab root notes
  function addChildren(parent) { // Add children to parent
    let children = noteList.filter((note) => note.parent === parent.id)
    if (children.length !== 0) {
      parent["children"] = children
    }
    for (let newParentNote of children) {
      addChildren(newParentNote) // Recursive call till there is no parents
    }
  }

  arrangedNoteTree = rootNotes // Add only root notes to the tree
  for (let rootNote of arrangedNoteTree) {
    addChildren(rootNote)
  }
  return arrangedNoteTree
}