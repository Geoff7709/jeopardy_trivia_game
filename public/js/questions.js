$(document).ready(() => {
  var answer;
  $("#single").on("click", () => {
    const callUrl3 = "https://jservice.io/api/random"
    $.ajax({
      url: callUrl3
    }).then(data => {
      console.log(data);
      answer = (data[0].answer);
      var divCard = $("<div>");
      divCard.attr("class", "card");
      var hEl = $("<h5>");

      hEl.attr("class", "card-header");
      hEl.attr("id", "displayQ");

      hEl.text(data[0].question);
      console.log(data[0].question)

      var divCb = $("<div>");
      divCb.attr("class", "card-body");
      var inputEl = $("<input>");
      inputEl.attr("class", "card-title");
      inputEl.attr("id", "answer");
      var btnEl = $("<button>");
      btnEl.attr("id", "subAns");
      btnEl.attr("class", "btn-primary");
      btnEl.text("Answer")
      var ansDiv = $("<div>");
      ansDiv.attr("class", "ansAlert");

      var mainDiv = divCb.append(inputEl, btnEl, ansDiv);

      divCard.append(hEl, mainDiv);

      $(".questionsX").append(divCard);

      $("#subAns").on("click", () => {
        // $(".questionsX").text(" ");

        var myAnswer = $("#answer");
        var myAnswerVal = (myAnswer.val().trim());

        console.log(myAnswerVal)

        if (answer === myAnswerVal) {
          // alert("Correct " + answer + " is equal to " + myAnswerVal);
          var xyz = $("<div>").text("Correct " + answer + " is equal to " + myAnswerVal);
          xyz.attr("class", "ansAlert1")
          $(".ansAlert").append(xyz)
        } else {
          alert("Incorrect " + answer + " is not equal to " + myAnswerVal);

          var abc = $("<div>").text("Correct " + answer + " is not equal to " + myAnswerVal);
          abc.attr("class", "ansAlert1")
          $(".ansAlert").append(abc);
        };
        myAnswer.val("");
      });
    });
  });


  $("#double").on("click", () => {
    const callUrl = "https://jservice.io/api/clues"
    $.ajax({
      url: callUrl
    }).then(data => {
      console.log(data);
      answer = (data[0].answer);

      for (i = 0; i < data.length; i++) {
        if (data[i].question !== " "){

        var divCard = $("<div>");
        divCard.attr("class", "card");
        var hEl = $("<h5>");
  
        hEl.attr("class", "card-header");
        hEl.attr("id", "displayQ");
  
        hEl.text(data[i].id + ". " + data[i].question);
        console.log(data[i].question)
  
        var divCb = $("<div>");
        divCb.attr("class", "card-body");
        var inputEl = $("<input>");
        inputEl.attr("class", "card-title");
        inputEl.attr("id", "answer");
        var btnEl = $("<button>");
        btnEl.attr("id", "subAns");
        btnEl.attr("class", "btn-primary");
        btnEl.text("Answer")
        var ansDiv = $("<div>");
        ansDiv.attr("class", "ansAlert");
  
        var mainDiv = divCb.append(inputEl, btnEl, ansDiv);
  
        divCard.append(hEl, mainDiv);
  
        $(".questionsX").append(divCard);
      }

     
      };
      $("#subAns").on("click", () => {
        // $(".questionsX").text(" ");

        var myAnswer = $("#answer");
        var myAnswerVal = (myAnswer.val().trim());

        console.log(myAnswerVal)

        if (answer === myAnswerVal) {
          alert("Correct " + answer + " is equal to " + myAnswerVal);
          var xyz = $("<div>").text("Correct " + answer + " is equal to " + myAnswerVal);
          xyz.attr("class", "ansAlert1")
          $(".ansAlert").append(xyz)
        } else {
          // alert("Incorrect " + answer + " is not equal to " + myAnswerVal);

          var abc = $("<div>").text("Correct " + answer + " is not equal to " + myAnswerVal);
          abc.attr("class", "ansAlert1")
          $(".ansAlert").append(abc);
        };
        myAnswer.val("");
      });

    });
  })

  $("#category").on("click", () => {
    const callUrl2 = "https://jservice.io/api/categories"
    $.ajax({
      url: callUrl2
    }).then(data => {
      console.log(data);
      
    });
  })

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // const callUrl = "https://jservice.io/api/clues"
  // $.ajax({
  //   url: callUrl
  // }).then(data => {
  //   console.log(data);
  // });
  // const callUrl2 = "https://jservice.io/api/categories"
  // $.ajax({
  //   url: callUrl2
  // }).then(data => {
  //   console.log(data);
  // });
  // const callUrl3 = "https://jservice.io/api/random"
  // $.ajax({
  //   url: callUrl3
  // }).then(data => {
  //   console.log(data);
  // });
});

