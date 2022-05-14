const router = require("express").Router();
const fs = require("fs");
let data = require("../../db/db.json");

//GET
router.get("/notes", (req, res) => {
  data = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  res.json(data);
});

//POST
router.post("/notes", (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 100),
  };
  data.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  res.json(data);
});

//DELETE
router.delete("/notes/:id", (req, res) => {
  let save = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].id != req.params.id) {
      save.push(data[i]);
    }
  }
  data = save;
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  res.json(data);
});

module.exports = router;
