const express = require("express");
var fs = require("fs");

const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/roles");

let selectedData = require("../data/jobs.json");

const router = express.Router();

// Get informations

router.get("/", (req, res) => {
  res.send({
    selectedData,
  });
});

// Add informations

router.post("/", async (req, res) => {
  let toPut = {
    id: selectedData.length + 1,
    data1: req.body.data1,
    data2: req.body.data2,
    data3: req.body.data3,
    data4: req.body.data4,
  };
  selectedData.push(toPut);

  fs.writeFile(
    "./data/jobs.json",
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
