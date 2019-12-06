const express = require("express");
const projectModel = require("../helpers/projectModel");

const router = express.Router();

// router.use(express.json());

// Request Handler Functions...

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET ID:", id);
  projectModel
    .get(id)
    .then(proj => {
      res.status(200).json({ proj });
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error while retreving projects" });
    });
});

// Middleware...

module.exports = router;
