const SuperDao = require('./SuperDao');
const models = require('../models');

const UserTodo = models.userTodo;

class UserTodoDao extends SuperDao {
    constructor() {
        super(UserTodo);
    }

}

module.exports = UserTodoDao;
