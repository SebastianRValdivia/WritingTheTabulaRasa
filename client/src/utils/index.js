export function filterNoteFamily(noteList, identifierList) {
  let parentNote
  let wrongNotes
  let noteFamily = []
  for (let index = 0; index < identifierList.length; index++) {
    if (index == 0) { // Root level
      wrongNotes = noteList.filter(
        (note) => (
          note.identifier === Number(identifierList[index]) && note.parent === null
        )
      )
      parentNote = noteList.find((note) => wrongNotes.includes(note))
      noteFamily.push(parentNote)
    } else {
      wrongNotes = noteList.filter(
        (note) => (
          note.identifier === Number(identifierList[index]) && note.parent === parentNote.id
        )
      )
      parentNote = noteList.find((note) => wrongNotes.includes(note))
      noteFamily.push(parentNote)
    }
  }
  return noteFamily // returns family in order

}