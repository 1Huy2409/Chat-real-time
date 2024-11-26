const homeRouter = require("./home.route")
const userRouter = require("./user.route");
const chatRouter = require("./chat.route");
const authMiddleware = require("../../middlewares/client/auth.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
module.exports = (app) => {
    app.use(userMiddleware.tokenUser);
    app.use('/', homeRouter)
    app.use('/user', userRouter);
    app.use('/chat', authMiddleware.requireAuth, chatRouter);
}
