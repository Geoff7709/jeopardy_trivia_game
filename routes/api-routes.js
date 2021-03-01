// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require('axios');

const axiosApiCall = (data) => {
  return axios(data)
}

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

  app.post("/api/currentScore", (req, res) => {
    var data = {
      currentScore: req.body.currentScore,
      highScore: req.body.highScore
    }
    console.log(data)
    db.create({
      currentScore: req.body.currentScore,
      highScore: req.body.highScore
    })
      .then(res => {
        console.log(res.body)
      })
      .catch(err => {
        res.status(401).json(err);
      })
  })

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      currentScore: null,
      highScore: null
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

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/gameBoard", (req, res) => {
    const randomOffset = Math.floor(Math.random() * 18000);
    const categoriesApiCall = `https://jservice.io/api/categories?offset=${randomOffset}&count=6`;
    const categoryApiCall = (arg) => `https://jservice.io/api/category?id=${arg}`;
    axiosApiCall({ url: categoriesApiCall }).then(response => {
      return Promise.all(response.data.map(item => axiosApiCall({ url: categoryApiCall(item.id) })));
    }).then((response) => {
      const payload = response.map(item => item.data)
      return res.json(payload)
    }).catch(err => {
      return res.status(422).json(err)
    })
  });
};
