// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const { Sequelize, Model, DataTypes } = require('sequelize');
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      artist_address: req.body.artist_address,
      artform: req.body.artform,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  //get all user data by id using all models User, Cost, and Pay
  app.get("/api/user_data/:id", (req, res) => {
    db.User.findAll({
      where: {
        userId: req.params.id
      },

      include: {

        model: db.Pay,
        model: db.Cost,
      }
    }).then(response => res.json(response))
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {

      res.json({});
    } else {
      // response json data to db
      res.json({
        email: req.user.email,
        artist_address: req.user.artist_address,
        artform: req.user.artform,
        id: req.user.id,
      });
    }
  });
  // Sum the amount of Pay table amount field per user email signin
  app.get("/api/pay/total/:email", function (req, res) {
    db.User.findAll({
      attributes: [[db.sequelize.fn('SUM', db.sequelize.col('amount')), 'tot_amt']],
      where: {
        email: req.params.email
      },
      include: db.Pay
    }).then(function (sum) {
      res.json(sum);
      console.log(sum);
    });
  });
  // Sum the amount of Cost table amount field per user email signin
  app.get("/api/cost/total/:email", function (req, res) {
    db.User.findAll({
      attributes: [[db.sequelize.fn('SUM', db.sequelize.col('cost')), 'tot_amt']],
      where: {
        email: req.params.email
      },
      include: db.Cost
    }).then(function (sum) {
      res.json(sum);
      console.log(sum);
    });
  });
  //Post to api the artist pay
  app.post("/api/pays/", function (req, res) {
    db.Pay.create({
      origin: req.body.origin,
      type: req.body.type,
      amount: req.body.amount,
      UserId: req.body.UserId
    }).then(function (dbPay) {
      res.json(dbPay);
    });
  });
  //Post to api the artist cost
  app.post("/api/costs/", function (req, res) {
    db.Cost.create({
      origin: req.body.origin,
      type: req.body.type,
      cost: req.body.cost,
      UserId: req.body.UserId
    }).then(function (dbCost) {
      res.json(dbCost);
    });
  });
  // delete the line of transaction form artist pay by id 
  app.delete("/api/pay/:id", function (req, res) {
    console.log(req.params.id);
    db.Pay.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPay) {
      res.json(dbPay);
    });
  });
  //delete the line of transaction from artist cost by id
  app.delete("/api/cost/:id", function (req, res) {
    console.log(req.params.id);
    db.Cost.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbCost) {
      res.json(dbCost);
    });
  });
};