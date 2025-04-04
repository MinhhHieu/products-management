const express = require ("express");
var methodOverride = require('method-override')
const bodyParse = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system")

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route");

database.connect();


const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

app.use(bodyParse.urlencoded({ extended: false }));

app.set("views","./views");
app.set("view engine", "pug");

// Express-Flash
app.use(cookieParser("MinhHieu"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Express-Flash

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));

// ROUTER
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});