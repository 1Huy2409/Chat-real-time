const RoomChat = require("../../models/rooms-chat.model")
module.exports.accessRoom = async (req, res, next) => {
    const roomChatId = req.params.roomChatId
    const roomChat = await RoomChat.findOne(
        {
            _id: roomChatId,
            "users.user_id": res.locals.user.id
        }
    )
    if (roomChat) {
        next();
    }
    else {
        res.redirect("/");
    }
}