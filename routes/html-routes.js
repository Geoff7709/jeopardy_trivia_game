// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const axios = require('axios');

const axiosApiCall = (data) => {
  return axios(data)
}

module.exports = function(app) {
// Home page is home.handlebars, not signup.handlebars
// we have to navigate to  signup page and login pages by clicking the button
  app.get("/", (req, res)=>{
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
    res.render('gamePlay',{
      user: req.user
    });   
  });
  app.get("/gameBoard", isAuthenticated, (req, res) => {
    // If the user already has an account send them to the members page
    // if a user is signup or logged in then render user to gamePlay page and user isAuthenticated added
    const categoriesApiCall = "https://jservice.io/api/categories?count=6";
    const categoryApiCall = (arg) => `https://jservice.io/api/category?id=${arg}`;
    axiosApiCall({url: categoriesApiCall}).then(response => {
      return Promise.all(response.data.map(item => axiosApiCall({ url: categoryApiCall(item.id) })));
    }).then((response) => {
      const payload = response.map(item => item.data)
      const questions = payload.map(item => item.clues)
      console.log(questions)
      const mergedQuestions = [].concat.apply([], questions)
      console.log(mergedQuestions)
      let hbsObject = {subjects: payload, question: mergedQuestions}
      console.log(hbsObject)
      return res.render("gameBoard", hbsObject)
    }).catch(err => {
      return res.status(422).json(err)
    })
  });
};
