const homeRouter = require("./home.route");
module.exports = (app) => {
    app.use('/admin', homeRouter)
}