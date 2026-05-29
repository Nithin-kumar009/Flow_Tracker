const router = require("express").Router();
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask, toggleTask } = require("../controllers/taskController");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);
router.patch("/:id/toggle", toggleTask);

module.exports = router;