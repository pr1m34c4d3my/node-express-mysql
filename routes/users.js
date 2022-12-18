let express = require("express");
let router = express.Router();

const VALIDATOR = require("fastest-validator");
const V = new VALIDATOR();

let {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
