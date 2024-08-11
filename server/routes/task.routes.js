const { Router } = require("express");
const { registerUser, login } = require("../controllers/user.controllers");
const {
  getAllTask,
  createTask,
  updateTask,
} = require("../controllers/task.controllers");
const { verifyJWT } = require("../middlewares/auth.middlewares");

const router = Router();

router.route("/task").get(verifyJWT, getAllTask);
router.route("/task").post(verifyJWT, createTask);
router.route("/task/:taskId").put(verifyJWT, updateTask);

module.exports = router;
