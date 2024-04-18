const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const UserDao = require('../dao/UserDao');
const responseHandler = require('../helper/responseHandler');
const logger = require('../config/logger');
const { userConstant } = require('../config/constant');

class UserService {
    constructor() {
        this.userDao = new UserDao();
    }

    /**
     * Create a user
     * @param {Object} userBody
     * @returns {Object}
     */
    createUser = async (userBody) => {
        try {
            let message = 'Successfully Registered the account! Please Verify your email.';
            if (await this.userDao.isEmailExists(userBody.email)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email already taken');
            }
            if (await this.userDao.isUserNameExists(userBody.username)) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'username already taken');
            }
            const uuid = uuidv4();
            userBody.first_name = userBody.firstName;
            userBody.last_name = userBody.lastName;
            userBody.username = userBody.username;
            userBody.phone_number = userBody.phnNumber;
            userBody.email = userBody.email;
            userBody.password = bcrypt.hashSync(userBody.password, 8);
            userBody.uuid = uuid;
            userBody.status = userConstant.STATUS_ACTIVE;
            userBody.email_verified = userConstant.EMAIL_VERIFIED_FALSE;

            let userData = await this.userDao.create(userBody);

            if (!userData) {
                message = 'Registration Failed! Please Try again.';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }
          
            userData = userData.toJSON();
            delete userData.password;

            return responseHandler.returnSuccess(httpStatus.CREATED, message, userData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    };

    /**
     * Get user
     * @param {String} email
     * @returns {Object}
     */

    isEmailExists = async (email) => {
        const message = 'Email found!';
        if (!(await this.userDao.isEmailExists(email))) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(httpStatus.OK, message);
    };

    checkPassword = async (id, data) => {
        let message = "user verified";
        let statusCode = httpStatus.OK;

        let user = await this.userDao.findOneByWhere({ id: id });

        if (!user) {
            return responseHandler.returnError(
                httpStatus.NOT_FOUND,
                "User Not Found!"
            );
        }

        console.log('user', user)
        console.log(user.password);
        const isPasswordValid = await bcrypt.compare(data, user.password);
        if (!isPasswordValid) {
            statusCode = httpStatus.BAD_REQUEST;
            message = "Wrong old Password!";
            return responseHandler.returnError(statusCode, message);
        } else {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                "Old Password exists!"
            );
        }
    };

    getUserByUuid = async (uuid) => {
        return this.userDao.findOneByWhere({ uuid });
    };

    changePassword = async (data, password) => {
        let message = 'Login Successful';
        let statusCode = httpStatus.OK;
        let user = await this.userDao.findOneByWhere({ id: data });

        if (!user) {
            return responseHandler.returnError(
                httpStatus.NOT_FOUND,
                "User Not found!"
            );
        }

        user = user.toJSON();
        delete user.password;

        const updateUser = await this.userDao.updateWhere(
            { password: bcrypt.hashSync(password, 8) },
            { id: data }
        );

        if (updateUser) {
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Password updated Successfully!',
                {},
            );
        }

        return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Password Update Failed!');
    };

    getUserById = async (req) => {
        try {
            console.log("id==", req);
            let userData = await this.userDao.findOneByWhere({ id: req });

            console.log('userData', userData);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                "Users fetched successfully",
                userData
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Error fetching users"
            );
        }
    };

    updateUser = async (req) => {
        try {
            let message = "user data updated ";

            const {
                id = 0,
                first_name = "",
                last_name = "",
                email = "",
                phone_number = 0,
                username="",
            } = req;

            let userData = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone_number: phone_number,
                username:username,
            };
            let userResponse = await this.userDao.findById(id);
            if (userResponse != null) {
                await this.userDao.updateById(userData, id);
                // console.log('225')
            } else {
                return responseHandler.returnError(
                    httpStatus.INTERNAL_SERVER_ERROR,
                    "No user Exists"
                );
            }
            return responseHandler.returnSuccess(httpStatus.CREATED, message);
        } catch (error) {
            // logger.error(e);
            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                "Error updating user"
            );
        }
    };
}

module.exports = UserService;
