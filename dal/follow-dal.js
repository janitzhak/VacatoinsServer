let connection = require("./connection-wrapper")

async function getAllFollowUp() {
    let sql = `SELECT f.id, v.photo_url as photoUrl, v.name as vacationName , count(u.name) as sumOfFollow
    FROM followed f join vacations v
    on f.vacation_id = v.id
    join users u
    on f.user_id = u.id
    group by f.vacation_id`;
    let list = await connection.execute(sql);
    return list;
}



async function addLike(likeData) {
    let sql = `INSERT INTO followed (user_id, vacation_id)  values(?, ?)`;
    let parameters = [likeData.userId, likeData.vacationId];
    await connection.executeWithParameters(sql, parameters);
    return;
}


async function isFollowExist(likeData) {
    let sql = `SELECT id from followed 
    where user_id = ? 
    and vacation_id= ? `;
    let parameters = [likeData.userId, likeData.vacationId];
    let valid = await connection.executeWithParameters(sql, parameters);

    if (valid && valid.length > 0) {
        return true;
    }
    return false;
}

async function deleteLike(likeData) {
    let sql = `DELETE FROM followed
    where user_id = ? 
    and vacation_id= ? `;
    let parameters = [likeData.userId, likeData.vacationId];

    let followArrey = await connection.executeWithParameters(sql, parameters);
    return followArrey;
}


module.exports = {
    getAllFollowUp,
    addLike,
    isFollowExist,
    deleteLike
}
