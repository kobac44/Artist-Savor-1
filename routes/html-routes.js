// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const express = require("express");
module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.User.findOne({
      //search for user by id from user model(table)
      where: {
        id: req.user.id
      },
      // include both models with user model
      include: [db.Pay, db.Cost],
    }).then((data) => {
      //renders index handlebars after auth 
      res.render("index", {
        // data is pulled from the database tables user, pay, and cost
        user: data,
        pay: data.Pays,
        cost: data.Costs
      });
    });
  });
};
