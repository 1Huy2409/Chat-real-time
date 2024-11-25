const mongoose = require("mongoose");
const generate = require("../helper/generate");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            unique: true
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        delete: {
            type: Boolean,
            default: false
        },
        deleteAt: Date,
    },
    {
        timestamps: true
    }
)
const User = mongoose.model('User', userSchema, "users")

module.exports = User;