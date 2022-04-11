let connection = require("./connection-wrapper")


async function getAllVacations() {
    let sql = "SELECT id, name, price, from_date as fromDate, to_date as toDate, photo_url as photoUrl FROM vacations.vacations";
    let vacations = await connection.execute(sql);
    return vacations;
}

async function addVacation(vacation) {
    let sql = "INSERT INTO vacations (name, price, from_date, to_date, photo_url)  values(?, ?, ?, ?, ?)";
    let parameters = [vacation.name, vacation.price, vacation.fromDate, vacation.toDate, vacation.photoUrl];
    let vacationData = await connection.executeWithParameters(sql, parameters);
    return vacationData.insertId;
}

async function deleteVacation(deleteId) {
    let sql = `DELETE
    FROM vacations
    where id = ? `;
    let parameters = [deleteId];
    await connection.executeWithParameters(sql, parameters);
    return;
}

async function deleteFkPointer(deleteId) {
    let sql = `DELETE FROM followed
    where vacation_id= ? `;
    let parameters = [deleteId];
    await connection.executeWithParameters(sql, parameters);
    return;
}

module.exports = {
    getAllVacations,
    addVacation,
    deleteVacation,
    deleteFkPointer
}
