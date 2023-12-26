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
}

function deleteNote(noteId) {
    // Removes the note with recived id from notes
    notes = notes.filter(note => note.id !== noteId);
    displayNotes();
    updateNoteStorage();
}

function displayNotes() {
        //displays the notes on screen + modifys the inputs for markdown and stops XSS
    const container = document.createElement('container');
    container.innerHTML = '';
    notes.forEach(note => {
        if (note.content.toLowerCase().includes(filter)) {
            const noteElement = document.createElement('div');
            noteElement.innerHTML =
                `<form class="note" id="note-${note.id}">
                    <span class="content">${DOMPurify.sanitize(marked.parse(note.content))}</span>
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
        //edit note based on recived id
    const noteToEdit = notes.find(note => note.id === noteId);
    const updatedContent = prompt('Edit note:', noteToEdit.content);
    if (updatedContent !== null) {
        noteToEdit.content = updatedContent;
        displayNotes();
        updateNoteStorage();
    }
}

function updateNoteStorage() {
        //updates the local storge
    localStorage.setItem('notes', JSON.stringify(notes));
}

function setFilter() {
        //setting filter based on search form
    filter = document.getElementById('searchBar').value.toLowerCase();
    console.log(filter);
    displayNotes();
}

//cheacks for events and prevents the defualt so as to not erase screen
window.addEventListener('load', initialize);
document.getElementById('noteForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addNote();});
    
    document.getElementById('filterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        setFilter();});
