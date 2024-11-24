const User = require("../../models/user.model");

module.exports.tokenUser = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        //tra ve thong tin user
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            delete: false,
            status: "active"
        })
        if (user) {
            res.locals.user = user;
        }
    }
    next();
}