const express = require("express");
const TodoController = require("../controllers/TodoController");

const router = express.Router();
const todoController = new TodoController();
const auth = require("../middlewares/auth");

router.post("/create-todo",auth(), todoController.createTodo);
router.post("/get-todos",todoController.getTodos);
router.post("/delete", auth(),todoController.deleteTodo);
router.post("/update-todo", auth(),todoController.updateTodo);

module.exports = router;
