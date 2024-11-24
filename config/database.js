const mongoose = require('mongoose');

module.exports.connect = async (req, res) => {
    try {
        //connect to database
        await mongoose.connect("mongodb://localhost:27017/chat-realtime");
        console.log("Connected successfully!");
    }
    catch (error) {
        console.log("Connected error!");
    }
}
mongoose.connect("mongodb://localhost:27017/chat-realtime");