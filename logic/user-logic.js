const usersDal = require('../dal/user-dal');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');


async function addUser(userRegistrationData) {
    console.error(userRegistrationData);
    validateUserData(userRegistrationData);
    if (await usersDal.isUserMailExist(userRegistrationData.userMail)) {
        throw new Error("User userMail already exist");
    }

    userRegistrationData.userPassword = encryptPassword(userRegistrationData.userPassword);
    await usersDal.addUser(userRegistrationData);
}

async function login(userLoginData) {
    userLoginData.password = encryptPassword(userLoginData.password);
    let userData = await usersDal.login(userLoginData);
    if (!userData) {
        throw new Error("Login failed");
    }
    let likeVacations = userData
    userData = userData[0]
    const token = jwt.sign({ userId: userData.id, userType: userData.type , likeVacations: likeVacations}, config.secret);
    let successfulLoginResponse = { token, likeVacations };

    console.log(successfulLoginResponse);
    console.log(userData);
    console.log(likeVacations.name);

    return successfulLoginResponse;
}



function validateUserData(userRegistrationData) {
    if (!userRegistrationData.userName) {
        throw new Error("Invalid user name or password");
    }

    if (!userRegistrationData.userPassword) {
        throw new Error("Invalid user name or password");
    }

    if (userRegistrationData.userPassword.length < 6) {
        throw new Error("Password is too short");
    }
}

function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}







module.exports = {
    addUser,
    login
}