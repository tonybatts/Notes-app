"use strict"

const titleElement = document.querySelector("#note-title")
const bodyElement = document.querySelector("#note-body")
const removeElement = document.querySelector("#remove-note")
const noteId = location.hash.substring(1)
const dateEl = document.querySelector("#edited-at")

let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if (!note) {
    location.assign("/index.html")
}

titleElement.value = note.title
bodyElement.value = note.body
dateEl.textContent = generateLastEdited(note.updatedAt)

// Listen for changes to title input and save on change
titleElement.addEventListener("input", (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateEl.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// Listen for changes to body input and save on change
bodyElement.addEventListener("input", (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateEl.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// Setup remove button
removeElement.addEventListener("click", () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")
})

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)

        if (!note) {
            location.assign("/index.html")
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateEl.textContent = generateLastEdited(note.updatedAt)

    }
})



