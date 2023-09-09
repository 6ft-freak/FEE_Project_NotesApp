function addNote() {
    const noteText = document.getElementById("noteInput").value;
    if (noteText.trim() !== "") {
        const notesContainer = document.getElementById("notesContainer");
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.textContent = noteText;

        // Add a delete button to each note
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Event listener for the delete button
        deleteButton.addEventListener("click", function () {
            notesContainer.removeChild(noteElement);
            deleteNoteFromLocalStorage(noteText);
        });

        noteElement.appendChild(deleteButton);
        notesContainer.appendChild(noteElement);
        saveNotesToLocalStorage(noteText);
        document.getElementById("noteInput").value = "";
    }
}

function saveNotesToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to delete a note from local storage
function deleteNoteFromLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((storedNote) => storedNote !== note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotesFromLocalStorage() {
    const notesContainer = document.getElementById("notesContainer");
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((noteText) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.textContent = noteText;

        // Add a delete button to each loaded note
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        // Event listener for the delete button
        deleteButton.addEventListener("click", function () {
            notesContainer.removeChild(noteElement);
            deleteNoteFromLocalStorage(noteText);
        });

        noteElement.appendChild(deleteButton);
        notesContainer.appendChild(noteElement);
    });
}

// Event listener for adding a new note
document.getElementById("addNote").addEventListener("click", addNote);

// Load existing notes from local storage when the page loads
window.addEventListener("load", loadNotesFromLocalStorage);
