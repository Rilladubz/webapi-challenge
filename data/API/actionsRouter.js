const express = require("express");
const actionModel = require("../helpers/actionModel");
const projectModel = require("../helpers/projectModel");

const router = express.Router();

// Request Handler Functions...

// CREATE...
router.post("/", validateExistingPostID, (req, res) => {
  const body = req.body;

  actionModel
    .insert(body)
    .then(action => {
      if (!action.description || action.notes < 1) {
        res
          .status(400)
          .json({ errorMessage: "A description & notes are required" });
      } else {
        res.status(201).json({ action });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error while trying to create action" });
    });
});

// READ...
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("ACTION GET ID:", id);
  actionModel
    .get(id)
    .then(actions => {
      if (actions) {
        res.status(200).json({ actions });
      } else {
        res.status(404).json({ errorMessage: "action not found invalid id" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error when fetching actions", err });
    });
  console.log("2nd ACTION GET ID:", id);
});

// UPDATE...
router.put("/:id/update", (req, res) => {
  actionModel
    .update(req.params.id, req.body)
    .then(updated => {
      res.status(201).json({ updated });
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Error occured when trying to update" });
    });
});

// DELETE...
router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;
  //   console.log("inbound ID:", id);
  actionModel
    .remove(id)
    .then(item => {
      res.status(200).json({ item });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error while attempting to delete an item",
        err
      });
    });
});

// Middleware...
function validateExistingPostID(req, res, next) {
  const id = req.body.project_id;

  projectModel
    .get(id)
    .then(project => {
      console.log("The project:", project);
      if (project) {
        next();
      } else if (!project) {
        res.status(404).json({
          errorMessage: `ProjectId: ${id} Does not exist. An id of an existing project is required.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error while validating to see if project ID exists"
      });
    });
}

module.exports = router;
