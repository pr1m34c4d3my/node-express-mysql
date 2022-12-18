let express = require("express");
let router = express.Router();

let {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectById,
} = require("../controllers/SubjectController");

router.get("/", getSubjects);
router.get("/:id", getSubjectById);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router;
