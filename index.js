const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const session = require('express-session');
const flash = require('express-flash');
var bodyParser = require('body-parser');
//socketio settings
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
//end socketio settings
//cookieparse
const cookieParser = require('cookie-parser');
//begin connect to 2 route (admin and client)
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
// end connect to 2 route
//begin connect to database
const database = require("./config/database");
database.connect();
//end connect to database
const path = require("path");
//method override http
const methodOverride = require('method-override');
global._io = io;
app.use(bodyParser.urlencoded({ extended: false })); //dung de phan tich ra req.body
//end method override htpp
app.use(flash());
app.use(methodOverride('_method'))
app.set('views', `${__dirname}/views`) //duong dan tuyet doi cho thu muc views
app.use(express.static(`${__dirname}/public`)) //duong dan tuyet doi cho thu muc public
app.set('view engine', 'pug')
//su dung cookie
app.use(cookieParser('1HuyOnly1'));
app.use(session({ cookie: { maxAge: 60000 } }));

routeClient(app);
// routeAdmin(app);
server.listen(port, () => {
    console.log(`App listening on port ${port}.`)
})