const User = require("../../models/user.model");
const usersSocket = require("../../socket/client/users.socket")
module.exports.notFriend = async (req, res) => {
    usersSocket(res);
    const userId = res.locals.user.id; //id yourself
    //tim cac user khong nam trong request va accept, khac yourself
    const myUser = await User.findOne({
        _id: userId
    })
    const requestFriend = myUser.requestFriend
    const acceptFriend = myUser.acceptFriend
    const users = await User.find(
        {   
            $and: [
                {_id: {$ne: userId}},
                {_id: {$nin: acceptFriend}},
                {_id: {$nin: requestFriend}},
            ],
            delete: false,
            status: "active"
        }
    )
    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}
module.exports.request = async (req, res) => {
    usersSocket(res);
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    })
    const requestFriend = myUser.requestFriend;
    const users = await User.find({
        _id: {$in: requestFriend},
        delete: false,
        status: "active"
    })
    res.render("client/pages/users/request", {
        pageTitle: "Lời mòi đã gửi",
        users: users
    })
    
}
module.exports.accept = async (req, res) => {
    usersSocket(res);
    const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    })
    const acceptFriend = myUser.acceptFriend;
    const users = await User.find({
        _id: {$in: acceptFriend},
        status: "active",
        delete: false
    })
    res.render("client/pages/users/accept", {
        pageTitle: "Lời mời kết bạn",
        users: users
    })
}
module.exports.friendList = async (req, res) => {
    res.send("ok");
}