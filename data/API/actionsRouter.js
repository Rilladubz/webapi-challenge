const express = require("express");
const actionModel = require("../helpers/actionModel");

const router = express.Router();

// Request Handler Functions...

// CREATE...
router.put("/", validateExistingPostID, (req, res) => {
  const body = req.body;
  actionModel
    .insert()
    .then()
    .catch();
});

// READ...
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

// UPDATE...

// DELETE...

// Middleware...
function validateExistingPostID(req, res, next) {
  const id = req.params.id;
  actionModel
    .get(id)
    .then(action => {
      if (action.id) {
        next();
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ errorMessage: `The id with a value of ${id} doesn't exist` });
    });
}

module.exports = router;
