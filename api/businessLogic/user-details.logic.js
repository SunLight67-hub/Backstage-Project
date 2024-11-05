const { userDetailService, addUserDetailService, updateUserDetailService, deleteUserDetailsService } = require('../service/user-details.service')


module.exports.getUserDetails = async (userId) => {
    console.log("---------------", userId)
    try {
        const response = await userDetailService(userId);
        console.log("=====================", response)
        return {
            status: 200,
            data: response,
        };

    } catch (error) {
        return {
            status: 500,
            error: "error while fetching",
        };
    }
};

module.exports.addUserDetails = async (body) => {
    // console.log("------------------", userName)
    try {
        const res = await addUserDetailService(body);
        console.log("=====================", res)
        return {
            status: 200,
            message: "data inserted successful",
            data: res,
        };
    }
    catch (error) {
        return {
            status: 500,
            error: "error while fetching",
        };
    }
}

module.exports.updateUserDetails = async (body) => {
    try {
        const resp = await updateUserDetailService(body);
        console.log("=====================", resp)
        return {
            status: 200,
            message: "data updated successful",
            data: resp,
        };
    }
    catch (error) {
        return {
            status: 500,
            error: "error while fetching",
        };
    }
}

module.exports.deleteUserDetails = async (usrId)=>{
    console.log("------------------",usrId)
try {
    const respn = await deleteUserDetailsService(usrId);
    console.log("=================",respn)
    return {
        status: 200,
        data: 'details deleted successful!'
    }
}
catch (error) {
    return {
        status: 500,
        data: "error while deleting the details"
    }
}
}