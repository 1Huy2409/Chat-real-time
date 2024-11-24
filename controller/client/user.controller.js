const User = require("../../models/user.model");
const md5 = require("md5");

module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Register Page"
    })
}
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        delete: false
    })
    if (existEmail) {
        req.flash("error", "Email này đã tồn tại 1 tài khoản!");
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Login Page"
    })
}
module.exports.loginPost = async (req, res)=> {
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        delete: false,
        status: "active"
    });
    if (!user) {
        req.flash("error", "Tài khoản này không tồn tại!");
        return;
    }
    if (md5(req.body.password) != user.password) {
        req.flash("error", "Mật khẩu không đúng, vui lòng nhập lại!");
        return;
    }
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}
module.exports.logout = async (req, res) => {
    //xoa bo cookie
    res.clearCookie("tokenUser");
    res.redirect("/");
}