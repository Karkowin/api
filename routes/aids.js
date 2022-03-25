const express = require("express");
var fs = require("fs");

const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/roles");

let selectedData = require("../data/aids.json");

const router = express.Router();

// Get informations

router.get("/", (req, res) => {
  res.send(JSON.stringify(selectedData));
});

// Add informations

router.post("/", [auth, editor], async (req, res) => {
  let toPut = {
    id: selectedData.length + 1,
    aide: req.body.data1,
    description: req.body.data2,
    lien: req.body.data3,
    daimageta4: req.body.data4,
  };
  selectedData.push(toPut);

  fs.writeFile(
    "./data/aids.json",
    JSON.stringify(selectedData),
    function writeJSON(err) {
      if (err) return console.log(err);
    }
  );

  res.status(200).send({
    selectedData,
  });
});

// Remove informations

router.delete("/:id", [auth, admin], async (req, res) => {
  delete selectedData[req.params.id - 1];

  res.status(200).send({
    selectedData,
  });
});

module.exports = router;
