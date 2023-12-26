let notes = [];
let id = 0;
let filter = '';

function initialize() {
    // Loads the msgs from localStorage on load
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
        id = notes.length;
        displayNotes();
    }
}

function addNote() {
    let newNote = {
        "id": id,
        content: document.getElementById('newNote').value
    };
    id += 1; 
    notes.push(newNote);
    document.getElementById('newNote').value = '';
    displayNotes();
    updateNoteStorage();
    console.log(notes); // REMOVE LATER
}

function deleteNote(noteId) {
    // Queries all notes and leaves out the one with the received id
    notes = notes.filter(note => note.id !== noteId);
    displayNotes();
    updateNoteStorage();
    console.log(notes); // REMOVE LATER
}

function displayNotes() {
    const container = document.createElement('container');
    container.innerHTML = '';
    notes.forEach(note => {
        if (note.content.toLowerCase().includes(filter)) {
            const noteElement = document.createElement('div');
            noteElement.innerHTML =
                `<form class="note" id="note-${note.id}">
                    <span class="content">${marked.parse(note.content)}</span>
                    <button class="removeButton" type="button" onclick="deleteNote(${note.id})">Remove</button>
                    <button class="editButton" type="button" onclick="editNote(${note.id})">Edit</button>
                </form>`;
            container.appendChild(noteElement);
        }
    });

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    contentDiv.appendChild(container);
}

function editNote(noteId) {
    const noteToEdit = notes.find(note => note.id === noteId);
    const updatedContent = prompt('Edit note:', noteToEdit.content);
    if (updatedContent !== null) {
        noteToEdit.content = updatedContent;
        displayNotes();
        updateNoteStorage();
    }
    console.log(notes); // Remove Later
}

function updateNoteStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function setFilter() {
    filter = document.getElementById('searchBar').value.toLowerCase();
    console.log(filter);
    displayNotes();
}

window.addEventListener('load', initialize);
document.getElementById('noteForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addNote();});
    
    document.getElementById('filterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        setFilter();});
