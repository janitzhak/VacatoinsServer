let connection = require("./connection-wrapper")

async function addUser(userRegistrationData) {
    let sql = `INSERT INTO users (name, email, password, birth_date, type)
                values(?, ?, ?, ?, ?)`;
    let parameters = [userRegistrationData.userName, userRegistrationData.userMail,
    userRegistrationData.userPassword, userRegistrationData.BirthDate, userRegistrationData.type];
    await connection.executeWithParameters(sql, parameters);
}

async function isUserMailExist(userMail) {
    let sql = "SELECT id from users where email = ?";
    let parameters = [userMail];
    let users = await connection.executeWithParameters(sql, parameters);

    if (users && users.length > 0) {
        return true;
    }
    return false;
}

async function login(user) {
    let sql = `SELECT u.id, u.type, 
    CASE WHEN v.name IS NULL THEN 0
    ELSE v.name
    END AS 'name'
    from users u left join followed f
    on f.user_id = u.id
    left join vacations v 
    on v.id = f.vacation_id      
    where email = ? and password = ?`;
    let parameters = [user.email, user.password];

    let userData = await connection.executeWithParameters(sql, parameters);
    if (!userData) {
        return null;
    }
    console.log(userData);

    return userData;
}



module.exports = {
    addUser,
    login,
    isUserMailExist
}
