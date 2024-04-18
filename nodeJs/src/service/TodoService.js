const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const UserTodoDao = require("../dao/UserTodoDao");
const UserDao = require("../dao/UserDao");
const responseHandler = require("../helper/responseHandler");
const logger = require("../config/logger");

class UserService {
  constructor() {
    this.userTodoDao = new UserTodoDao();
    this.userDao = new UserDao();
  }

  createTodo = async (userBody) => {
    try {
      const uuid = uuidv4();
      userBody.todo_text = userBody.text;
      userBody.uuid = uuid;
      // return;
      userBody.user_Id = userBody.id;
      console.log("userBody", userBody);
      delete userBody.id;
      // return;
      let userData = await this.userTodoDao.create(userBody);

      if (!userData) {
        let message = "Insertion Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      userData = userData.toJSON();
      delete userData.password;

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        "todo added successfully",
        userData
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  getTodos = async (id) => {
    try {
      const todos = await this.userTodoDao.findByWhere({ user_Id: id }, [
        "id",
        "todo_text",
        "user_Id",
      ]);
      console.log("todos", todos);

      if (!todos) {
        let message = "Request Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        "todos fetched successfully",
        todos
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  deleteTodo = async (id) => {
    try {
      const todos = await this.userTodoDao.deleteByWhere({ id: id });

      if (!todos) {
        let message = "Deletion Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        "todo deleted successfully",
        todos
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  updateTodo = async (id, data) => {
    try {
      const todos = await this.userTodoDao.updateWhere(
        { todo_text: data },
        { id: id }
      );

      if (!todos) {
        let message = "Deletion Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        "todo deleted successfully",
        todos
      );
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };
}

module.exports = UserService;
