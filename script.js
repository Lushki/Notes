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
        document.getElementById('content').innerHTML = notes.map(note => note.content);

        console.log(notes);
}

function displayNotes()
{
        notes.forEach(note => {
                
        });
}

document.getElementById('noteForm').addEventListener('submit',addNote);