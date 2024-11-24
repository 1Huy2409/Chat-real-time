const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
module.exports.chat = async (req, res) => {
    const fullName = res.locals.user.fullName;
    const userId = res.locals.user.id;
    _io.once('connection', async (socket) => {
        console.log("1 user connected to server ", socket.id);
        //CLIENT SEND MESSAGE
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const chat = new Chat({
                user_id: userId,
                content: data
            })
            await chat.save();
            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                fullName: fullName,
                content: data
            })
        })
        //END CLIENT SEND MESSAGE
    });
    const chats = await Chat.find({});
    for (let chat of chats) {
        //moi chat tim fullName cua nguoi gui, tra chats ve cho giao dien
        const infoUser = await User.findOne({
            _id: chat.user_id,
        }).select("fullName");
        chat.infoUser = infoUser;
    }
    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats: chats
    })
}  