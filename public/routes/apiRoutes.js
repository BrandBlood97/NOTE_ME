const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// API Routes
module.exports = function (app) {

    // Get all notes
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });

    // Save a new note
    app.post('/api/notes', (req, res) => {
        const newNote = { ...req.body, id: uuidv4() };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            const notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                res.json(newNote);
            });
        });
    });

    // Bonus: Delete a note
    app.delete('/api/notes/:id', (req, res) => {
        const noteId = req.params.id;

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            notes = notes.filter(note => note.id !== noteId);

            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                res.json({ message: `Deleted note with id: ${noteId}` });
            });
        });
    });
};
