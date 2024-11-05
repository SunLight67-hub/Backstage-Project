const { writeJSON } = require('../../writer');
const AppException = require('../utilities/error');
const { users: userData } = require('../models');
const { message, resourceType, methodName } = require('../constants/logger_constants');

exports.userDetailService = async (userId) => {
    console.log("............", userId)
    try {
        console.log({
            methodName: `service - ${methodName.getOutstandingsData}`,
            resourceType: resourceType.posService,
            message: message.getOutstandingsMessage,
        });

        const data = await userData.findOne({
            attributes: [
                'userName',
                'userId'
            ],
            where: {
                userId: userId,
            },
            raw: true,
        });
        if (!data) {
            throw new AppException(404, 'USER_NOT_FOUND', 'User not found');
        }

        return {
            status: 200,
            data,
        };
    } catch (err) {
        console.error('Error fetching user details:', err.message || err);
        throw new AppException(
            err.status || 500,
            err.errorCode || 'UNKNOWN_ERROR',
            err.message || 'An error occurred while fetching user details'
        );
    }
};

module.exports.addUserDetailService = async (body) => {
    // console.log("..............",userName);
    try {
        console.log({
            methodName: `service - ${methodName.getOutstandingsData}`,
            resourceType: resourceType.posService,
            message: message.getOutstandingsMessage,
        });
        const newUser = await userData.create({
            userName: body.userName
        });
        if (!newUser) {
            throw new AppException(404, 'USER_NOT_ADDED', 'User not added');
        }

        return {
            status: 201,
            newUser,
        };
    }
    catch (err) {
        console.error('Error inserting user details:', err.message || err);
        throw new AppException(
            err.status || 500,
            err.errorCode || 'UNKNOWN_ERROR',
            err.message || 'An error occurred while inserting user details'
        );
    }
};

module.exports.updateUserDetailService = async (body) => {
    try {
        const userExist = await userData.findOne({
            where: {
                userId: body.userId
            }
        })
        if (!userExist) {
            throw new AppException(404, 'ID_NOT_found', 'Id not found');
        }
        const updateUser = await userData.update(
            {
                userName: body.userName
            },
            {
                where: {
                    userId: body.userId
                },
            },
        );

        return {
            status: 201,
            updateUser,
        };
    }
    catch (err) {
        console.error('Error updating user details:', err.message || err);
        throw new AppException(
            err.status || 500,
            err.errorCode || 'UNKNOWN_ERROR',
            err.message || 'An error occurred while update user details'
        );
    }
};

module.exports.deleteUserDetailsService = async (usrId) => {
    console.log("...............",usrId)
    try {
        const uidExist = await userData.findOne({
            where: {
                userId: usrId
            }
        })
        if (!uidExist) {
            throw new AppException(404, 'ID_NOT_found', 'Id not found');
        }

        const deleteUser = await userData.destroy({
            where: {
                userId: usrId
            }
        });

        return {
            status: 200,
            deleteUser,
        };
    }
    catch (err) {
        console.error('Error updating user details:', err.message || err);
        throw new AppException(
            err.status || 500,
            err.errorCode || 'UNKNOWN_ERROR',
            err.message || 'An error occurred while update user details'
        );
    }
}