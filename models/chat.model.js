const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const chatSchema = new mongoose.Schema(
    {
        user_id: String,
        room_chat_id: String,
        content: String,
        images: Array,
        delete: {
            type: Boolean,
            default: false
        },
        deleteAt: Date,
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema, "chats");
module.exports = Chat;