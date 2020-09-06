// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const bodyParser = require('body-parser');
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
//use app express data as json 
app.use(express.json());
//app static access from public directory
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status passport initialization
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// Requiring our routes api and html
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// Set Handlebars.
const exphbs = require("express-handlebars");
//handlebars required setup engine and default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
