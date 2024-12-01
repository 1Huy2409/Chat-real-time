const User = require("../../models/user.model");

module.exports = async (res) => {
    const myUserId = res.locals.user.id;
    _io.once("connection", (socket) => {
        //ADD_FRIEND
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
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
            const infoUserB = await User.findOne(
                {
                    _id: userId
                }
            )
            const infoUserA = await User.findOne(
                {
                    _id: myUserId
                }
            )
            socket.broadcast.emit("SERVER_RETURN_USERS_ACCEPT_LENGTH", 
                {
                    UserIdB: userId,
                    acceptLength: infoUserB.acceptFriend.length
                }
            )
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT", {
                infoUserA: infoUserA,
                userIdB: userId
            })

        }) 
        //CANCEL REQUEST
        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
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
            const infoUserB = await User.findOne(
                {
                    _id: userId
                }
            )
            socket.broadcast.emit("SERVER_RETURN_USERS_ACCEPT_LENGTH", 
                {
                    UserIdB: userId,
                    acceptLength: infoUserB.acceptFriend.length
                }
            )
        })
        //REFUSE REQUEST
        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
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
        // SERVER_RETURN_USERS_ACCEPT_LENGTH
        
    })
}