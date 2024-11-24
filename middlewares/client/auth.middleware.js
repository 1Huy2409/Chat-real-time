const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.tokenUser) {
        res.redirect("/user/login");
    }
    else {
        //co chua tokenUser
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            delete: false
        }).select("-password");
        if (!user) {
            console.log("Account not exist");
            res.redirect("/user/login");
        }
        else {
            res.locals.user = user;
            next();
        }
    }
}