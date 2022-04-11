const followDal = require('../dal/follow-dal');


async function getAllFollowUp() {
    let vacations = await followDal.getAllFollowUp();
    return vacations;
}


async function addLike(likeData) {

    if (await followDal.isFollowExist(likeData)) {
        await followDal.deleteLike(likeData);
    }
    else {
        await followDal.addLike(likeData);
    }
    return ;
}


module.exports = {
    getAllFollowUp,
    addLike
}