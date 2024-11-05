const businessLogic = require('../businessLogic/user-details.logic')
const { writeJson } = require('../../writer');

module.exports.getUserDetails = function getUserDetails(req, res) {
    const userId = req.swagger.params.userId.value;
    console.log(">>>>>>>>>>>",userId)
    businessLogic.getUserDetails(userId)
        .then((response) => {
            writeJson(res, response, 200);
            // res.status(200).json(response)
        })
        .catch((error) => {
            writeJson(res, error, error.status);
            // res.status(400).json(error)
        });
};

module.exports.addUserDetails = function addUserDetails(req,res) {
//  const userName = req.body.userName;
//  console.log("===============",userName)
 businessLogic.addUserDetails(req.body)
 .then((response)=>{
    writeJson(res,response,200)
 })
 .catch((error)=>{
    writeJson(res,error,error.status);
 })
};

module.exports.updateUserDetails = function updateUserDetails(req,res) {
businessLogic.updateUserDetails(req.body)
.then((response)=>{
    writeJson(res,response,200)
 })
 .catch((error)=>{
    writeJson(res,error,error.status);
 })
};

module.exports.deleteUserDetails = function deleteUserDetails(req,res) {
    const usrId = req.swagger.params.userId.value;
    console.log("=======================",usrId)
    businessLogic.deleteUserDetails(usrId)
    .then((response)=>{
        writeJson(res,response,200)
    })
    .catch ((error) => {
        writeJson(err,error,error.status)
    })
}