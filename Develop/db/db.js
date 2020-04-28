const fs = require("fs");
const util = require("util");
const uuid = require("uuid/v4");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// const noteX = {"title":"Test Title","text":"Test text"}

// ...nodeX = "title":"Test Title","text":"Test text"

class DB {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes));
  }

  addNote(note) {
    const completedNote = {
      ...note,
      id: uuid(),
    };
    return this.read().then((notes) => {
      const noteObj = JSON.parse(notes);
      noteObj.push(completedNote);
      return this.write(noteObj);
    });
  }

  getNotes() {
    return this.read()
      .then((notes) => {
        console.log(notes);
        return JSON.parse(notes);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  deleteNote(id) {
    return this.getNotes().then((notes) => {
      const result = notes.filter((note) => note.id !== id);
      return this.write(result);
    });
  }
}

module.exports = new DB();
