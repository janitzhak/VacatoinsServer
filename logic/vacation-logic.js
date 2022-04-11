const vacationsDal = require('../dal/vacation-dal');

async function getAllVacations() {
    let vacations = await vacationsDal.getAllVacations();
    return vacations;
}

async function addVacation(vacation) {
    await vacationsDal.addVacation(vacation);
    return vacation;
}

async function deleteVacation(deleteId) {
    await vacationsDal.deleteFkPointer(deleteId);
    await vacationsDal.deleteVacation(deleteId);
    return ;
}

module.exports = {
    getAllVacations,
    addVacation,
    deleteVacation
}