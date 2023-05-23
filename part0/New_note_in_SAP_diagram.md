sequenceDiagram
    participant browser
    participant server

    Note right of browser: the browser creates a new note, adds it to the notes list with the command notes.push(note), rerenders the note list on the page and sends the new note to the server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: status code 201 created
    deactivate server


