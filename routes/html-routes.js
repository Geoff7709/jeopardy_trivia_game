// Requiring path to so we can use relative routes to our HTML files
const path = require("path");


// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Home page is home.handlebars, not signup.handlebars
  // we have to navigate to  signup page and login pages by clicking the button
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    };
    res.render('signup');
  });


  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    };
    res.render('login');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render('members', {
      user: req.user
    });
  });
  app.get("/gamePlay", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    // if a user is signup or logged in then render user to gamePlay page and user isAuthenticated added

    res.render('gamePlay', {
      user: req.user
    });
  });

  app.get("/gameBoard", isAuthenticated, (req, res) => {
    // getting clues
    // manually pass in the value depending if it is single or double Jeopardy
    // returns maximum of five clues
    const payload = (item, queryType) => {
      return item.reduce((acc, curr, indexValue) => {
        if (acc.length < 5) {
          curr.value = (indexValue + 1) * queryType
          acc.push(curr)
          return acc
        }
        return acc
      }, [])
    }

    // transforming array of categories
    // creates a copy of categories
    // returns a new copy of clues ( up to five ) for each category
    const categories = (queryType, data) => data.map(item => {
      return Object.assign({}, item, { clues: payload(item.clues, queryType) })
    })

    // manually setting values for single and double jeopardy
    const query = { single: 100, double: 200 }
    // If the user already has an account send them to the members page
    // if a user is signup or logged in then render user to gamePlay page and user isAuthenticated added
    const { type = 'single' } = req.query
    console.log(type);
    req.uest({
      method: 'GET',
      url: '/api/gameBoard',
      body: { type }
    }, (er, resp) => {
      if (er) {
        return res.render('login')
      }
      const body = categories(query[type], resp.body)
      res.render('gameBoard', {
        object: body
      })
    })
  })
};
