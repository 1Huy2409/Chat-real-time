const homeRouter = require("./home.route")
const userRouter = require("./user.route");
const chatRouter = require("./chat.route");
const usersRouter = require("./users.route");
const roomChatRouter = require("./rooms-chat.route");
const authMiddleware = require("../../middlewares/client/auth.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
module.exports = (app) => {
    app.use(userMiddleware.tokenUser);
    app.use('/', homeRouter)
    app.use('/user', userRouter);
    app.use('/users', usersRouter);
    app.use('/chat', authMiddleware.requireAuth, chatRouter);
    app.use('/rooms-chat', authMiddleware.requireAuth, roomChatRouter);
}
