const User = require("../../models/user.model");

module.exports.tokenUser = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            delete: false,
            status: "active"    
        }).select("-password");
        if (user) {
            res.locals.user = user;
        }
        else {
            res.clearCookie("tokenUser");
        }
    }
    next();
}