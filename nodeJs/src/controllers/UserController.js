const httpStatus = require("http-status");
const UserService = require("../service/UserService");
const logger = require("../config/logger");
const { decryptData, encryptData } = require("../security/EncryDecrypt");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  viewUser = async (req, res) => {
    try {
          const  decryptedData = decryptData(req.body.requestData.userId);
            console.log('decryptedData', decryptedData)
            const user = await this.userService.getUserById(decryptedData);

            const { status } = user.response;
            const { message, data } = user.response;
            const encryptedData=encryptData(data)
            res.status(user.statusCode).send({ status, message, encryptedData });
        
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  updateUser = async (req, res) => {
    try {
        console.log('req.body', req.body);
        
          const  decryptedData = decryptData(req.body.encryptedData);
            console.log('decryptedData', decryptedData)
            const response = await this.userService.updateUser(decryptedData.data);
            const { status } = response.response;
            const { message, data } = response.response;
            res.status(response.statusCode).send({ status, message });
        
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

module.exports = UserController;
