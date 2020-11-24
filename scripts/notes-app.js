"use strict"

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: "byEdited"
}

const user = {
    name: "Tony",
    age: 28
}

renderNotes(notes, filters)

document.querySelector("#create-note").addEventListener("click", () => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        createdAt: timeStamp,
        updatedAt: timeStamp,
        id: id,
        title: "",
        body: ""
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})

document.querySelector("#search-text").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector("#filter-by").addEventListener("change", (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})


