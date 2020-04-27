const router = require("express").Router();
const db = require("../db/db");

router.get("/notes", function (req, res) {
  db.getNotes().then((notes) => res.json(notes));
});

router.post("/notes", function (req, res) {
  db.addNote(req.body)
    .then(function () {
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.delete("/notes/:id", function (req, res) {});

module.exports = router;
