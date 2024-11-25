module.exports.registerPost = (req, res) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập họ tên!");
        res.redirect("back");
        return;
    }
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("back");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu!");
        res.redirect("back");
        return;
    }
}
module.exports.loginPost = (req, res) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("back");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu!");
        res.redirect("back");
        return;
    }
}
module.exports.forgotPasswordPost = (req, res) => {
    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("back");
        return;
    }
}
module.exports.otpPasswordPost = (req, res) => {
    if (!req.body.otp) {
        req.flash("error", "Vui lòng nhập mã otp!");
        res.redirect("back");
        return;
    }
}
module.exports.resetPasswordPost = (req, res) => {
    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu mới!");
        res.redirect("back");
        return;
    }
    if (!req.body.confirmPassword) {
        req.flash("error", "Vui lòng xác nhận mật khẩu mới!");
        res.redirect("back");
        return;
    }
    if (req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Xác nhận mật khấu không chính xác!");
        res.redirect("back");
        return;
    }
}

