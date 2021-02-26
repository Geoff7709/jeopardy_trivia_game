const express = require('express');

const router = express.Router();

const axios = require('axios');


router.get("/api/questions", function (req, res) {
    console.log('router get')
    const callUrl2 = "https://jservice.io/api/categories?count=50"
    axios.get(callUrl2).then((response) => {
        let questionsArray = []
        response.data.map(questions => questionsArray.push(questions))
        res.json(questionsArray);
    })
    .catch(err => console.log(err))
});
module.exports = router
