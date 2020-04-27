const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(notes) {
    return writeFileAsync("db/db.json", JSON.stringify(notes));
  }

  addNote(note) {
    return this.read().then((notes) => {
      const noteObj = JSON.parse(notes);
      noteObj.push(note);
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
}

module.exports = new DB();
