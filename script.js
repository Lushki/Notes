let notes =[];
let id = 0;
function addNote(event)
{
        event.preventDefault();
        let newNote = 
                {
                        "id" : id,
                        content : document.getElementById('newNote').value
                };
        id += 1;
        notes.push(newNote);
        document.getElementById('newNote').value = '';
        displayNotes();

        
        console.log(notes); //REMOVE LATER
}

function deletNote(noteId)
{ 
        //Querrs all notes and leaves out the one with the rec id
        notes = notes.filter(note => note.id !== noteId); 
        displayNotes();
        console.log(notes); //REMOVE LATER
}

function displayNotes()
{
        const container = document.createElement('content');
        container.innerHTML = '';
        notes.forEach(note => {
                const  noteElement = document.createElement('div')
                noteElement.innerHTML = 
                `<form class="note" id="note-${note.id}">
                Note: <span class="content">${note.content}</span>
                <button class="removeButton" type="button" onclick="deletNote(${note.id})">Remove</button>
                <button class="editButton" type="button" onclick="editNote(${note.id})">Edit</button>
                </form>`

            container.appendChild(noteElement); 
        });

        //Clearing the container before looping through the notes so as to not duplicate notes
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';
        contentDiv.appendChild(container);
        
}

function editNote(noteId)
{
        const noteToEdit = notes.find(note => note.id === noteId);
        const updatedContent = prompt('Edit note:', noteToEdit.content);
        if (updatedContent !== null) {
                noteToEdit.content = updatedContent;
                displayNotes();
            }
        console.log(notes); //Remove Later
}


document.getElementById('noteForm').addEventListener('submit',addNote);
