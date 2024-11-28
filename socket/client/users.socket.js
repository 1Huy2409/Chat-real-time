const User = require("../../models/user.model");

module.exports = async (res) => {
    _io.once("connection", (socket) => {
        //ADD_FRIEND
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriend: userId
            })
            if (!existBinA) {
                //add id cua b vao request cua a
                await User.updateOne(
                    {_id: myUserId},
                    {
                        $push: {requestFriend: userId}
                    }
                )
            }
            const existAinB = await User.findOne({
                _id: userId,
                acceptFriend: myUserId
            })
            if (!existAinB) {
                //add id cua b vao request cua a
                await User.updateOne(
                    {_id: userId},
                    {
                        $push: {acceptFriend: myUserId}
                    }
                )
            }

        }) 
        //CANCEL REQUEST
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            const existBinA = await User.findOne({
                _id: myUserId,
                requestFriend: userId
            })
            if (existBinA) {
                //add id cua b vao request cua a
                await User.updateOne(
                    {_id: myUserId},
                    {
                        $pull: {requestFriend: userId}
                    }
                )
            }
            const existAinB = await User.findOne({
                _id: userId,
                acceptFriend: myUserId
            })
            if (existAinB) {
                //add id cua b vao request cua a
                await User.updateOne(
                    {_id: userId},
                    {
                        $pull: {acceptFriend: myUserId}
                    }
                )
            }
        })
        //REFUSE REQUEST
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id;
            const existBinA = await User.findOne({
                _id: myUserId,
                acceptFriend: userId
            })
            if (existBinA) {
                //add id cua b vao request cua a
                await User.updateOne(
                    {_id: myUserId},
                    {
                        $pull: {acceptFriend: userId}
                    }
                )
            }
            const existAinB = await User.findOne({
                _id: userId,
                requestFriend: myUserId
            })
            if (existAinB) {
                //add id cua b vao request cua a
                await User.updateOne(
                    {_id: userId},
                    {
                        $pull: {requestFriend: myUserId}
                    }
                )
            }
        })
        //ACCEPT REQUEST
        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            //diff: push userId and myUserId into friendList of each other
            const myUserId = res.locals.user.id;
            const existBinA = await User.findOne({
                _id: myUserId,
                acceptFriend: userId
            })
            if (existBinA) {
                //add id cua b vao request cua a
                await User.updateOne(
                    {_id: myUserId},
                    {
                        $pull: {acceptFriend: userId},
                        $push: {friendList: {
                            user_id: userId,
                            room_chat_id: ""
                        }}
                    }
                )
            }
            const existAinB = await User.findOne({
                _id: userId,
                requestFriend: myUserId
            })
            if (existAinB) {
                await User.updateOne(
                    {_id: userId},
                    {
                        $pull: {requestFriend: myUserId},
                        $push: {friendList: {
                            user_id: myUserId,
                            room_chat_id: ""
                        }}
                    }
                )
            }
        })
    })
}