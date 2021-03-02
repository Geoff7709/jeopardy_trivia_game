// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require('axios');
const { Op } = require("sequelize");

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

  // app.get("/api/gameBoard", (req, res) => {
  //   const categoriesApiCall = "https://jservice.io/api/categories?count=6";
  //   const categoryApiCall = (arg) => `https://jservice.io/api/category?id=${arg}`;
  //   axiosApiCall({ url: categoriesApiCall }).then(response => {
  //     return Promise.all(response.data.map(item => axiosApiCall({ url: categoryApiCall(item.id) })));
  //   }).then((response) => {
  //     const payload = response.map(item => item.data)
  //     return res.json(payload)
  //   }).catch(err => {
  //     return res.status(422).json(err)
  //   })

  // }); 

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

  app.post("/api/category", (req, res) => {
    const { id, category_id, answer } = req.body
    const categoryApiCall = (arg) => `https://jservice.io/api/category?id=${arg}`;
    axiosApiCall({ url: categoryApiCall(category_id) })
      .then((response) => {
        const currentClue = response.data.clues.find(element => element.id === id);
        const checkAnswer = currentClue.answer.includes(answer)
        return res.json({ checkAnswer })
      }).catch(err => {
        return res.status(422).json(err)
      })
  });

  app.post("/api/currentScore", (req, res) => {
    // destructuring currentScore and highScore from the resquest
    // and saving it to the request body.
    const { currentScore = null, highScore = null } = req.body
    // creating a user object with the currentScore and highScore null
    let user = {
      currentScore: null,
      highScore: null,
    };
    // comparing request from api body
    if (currentScore > highScore) {
      // sets the user currentScore and highScore as the score from the api body request only
      // if the currentScore is greater than the highScore
      user.currentScore = +currentScore;
      user.highScore = +currentScore;
    } else {
      // sets the user currentScore and highScore as the score from the api body request
      user.currentScore = +(currentScore || 0)
    }
    // updates user database where the id matches the id on the body request
    // when user highScore is null, the highScore value will not update
    // when currentScore is greater then the highScore we will update the highScore cell to match the currentScore 
    // { currentScore: user.currentScore } before spread operation/initial state
    // { currentScore: user.currentScore, highScore: user.highScore } spread highscore into object
    db.User.update({ currentScore: user.currentScore, ...user.highScore ? { highScore: user.highScore } : null }, { where: { id: +req.body.id } }).then(()=> {
      return res.json({ user: 'OK' })
    }).catch(err => {
      return res.status(422).json(err)
    })
  });

  // get request on api highScore route
  app.get("/api/highScore", (req, res) => {
    // uses sequelize simple select queries
    // https://sequelize.org/master/manual/model-querying-basics.html#simple-insert-queries
    db.User.findAll({
      // targets highScore in database where the value is not null
      where: {
        // https://sequelize.org/master/manual/model-querying-basics.html#applying-where-clauses
        highScore: {
          [Op.not]: null,
        },
      },
      // limits the returned highScores to 10
      // sets the highScore in descending order 
      // https://sequelize.org/master/manual/model-querying-basics.html#ordering
      limit: 10,
      attributes: ['highScore', 'email'],
      order: [
        ['highScore', 'DESC']
      ]
    })
    .then(response => {
      return res.json(response)
    })
    .catch(err => {
      return res.status(401).json(err);
    })
  })
};

