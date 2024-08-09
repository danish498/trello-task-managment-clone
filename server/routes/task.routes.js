const { Router } = require("express");
const { registerUser, login } = require("../controllers/user.controllers");
const { getAllTask, createTask, updateTask } = require("../controllers/task.controllers");

const router = Router();

router.route("/task").get(getAllTask);
router.route("/task").post(createTask);
router.route("/task/:taskId").put(updateTask);

module.exports = router;
