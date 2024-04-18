const httpStatus = require("http-status");
const TodoService = require("../service/TodoService");
const logger = require("../config/logger");
const { decryptData } = require("../security/EncryDecrypt");

class TodoController {
  constructor() {
    this.todoService = new TodoService();
  }

  createTodo = async (req, res) => {
    try {
      const decryptedData = decryptData(req.body.data);
      console.log("decryptedData", decryptedData);
      const todo = await this.todoService.createTodo(decryptedData);
      const { status } = todo.response;
      const { message, data } = todo.response;
      res.status(todo.statusCode).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

 getTodos = async (req, res) => {
    try {
      const decryptedData = decryptData(req.body.id);
      const todo = await this.todoService.getTodos(decryptedData);
      const { status } = todo.response;
      const { message, data } = todo.response;
      const encryptedData=encryptData(data);
      res.status(todo.statusCode).send({ status, message, encryptedData });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  deleteTodo = async (req, res) => {
    try {
      const decryptedData = decryptData(req.body.id);
      console.log("decryptedData", decryptedData);
      const todo = await this.todoService.deleteTodo(decryptedData);
      const { status } = todo.response;
      const { message } = todo.response;
      res.status(todo.statusCode).send({ status, message });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
  updateTodo = async (req, res) => {
    try {
      const decryptedData = decryptData(req.body.data);
      const todo = await this.todoService.updateTodo(
        decryptedData.id,
        decryptedData.text
      );
      const { status } = todo.response;
      const { message, data } = todo.response;
      res.status(todo.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = TodoController;
