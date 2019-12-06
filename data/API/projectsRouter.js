const express = require("express");
const projectModel = require("../helpers/projectModel");

const router = express.Router();

// router.use(express.json());

// Request Handler Functions...

// CREATE...
router.post("/", validateProjectBody, (req, res) => {
  const body = req.body;
  console.log("PROJECT BODY:", body);
  projectModel
    .insert(body)
    .then(project => {
      if (project) {
        res.status(201).json({ project });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Sorry error occured check with back end", err });
    });
});

// READ...
router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET ID:", id);
  projectModel
    .get(id)
    .then(proj => {
      if (proj) {
        res.status(200).json({ proj });
      } else {
        res.status(404).json({
          errorMessage: `A project with the id of ${id} does not exist.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error while retreving projects" });
    });
});

// UPDATE...
router.put("/:id/update", validateProjectBody, (req, res) => {
  const id = req.params.id;
  console.log("Update Id:", id);
  projectModel
    .update(req.params.id, req.body)
    .then(updatedProject => {
      updatedProject
        ? res.status(201).json({ updatedProject })
        : res.status(400).json({ errorMessage: "Body is required." });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Failed Update attempt check with Back end.",
        err
      });
    });
});

// DELETE...
router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;
  projectModel
    .remove(id)
    .then(item => {
      item
        ? res.status(200).json({ item })
        : res
            .status(500)
            .json({
              errorMessage: `A Project with an id of ${id} does not exist`
            });
    })
    .catch();
});

// Middleware...
function validateProjectBody(req, res, next) {
  const body = req.body;

  body.name && body.description
    ? next()
    : res.status(400).json({ errorMessage: "Body content required" });
}

module.exports = router;
