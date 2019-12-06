const express = require("express");
const actionModel = require("../helpers/actionModel");

const router = express.Router();

// Request Handler Functions...
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("ACTION GET ID:", id);
  actionModel
    .get(id)
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error when fetching actions", err });
    });
  console.log("2nd ACTION GET ID:", id);
});

// Middleware...

module.exports = router;
