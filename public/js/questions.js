$(document).ready(() => {
  var answer;
  $("#single").on("click", () => {
    const callUrl3 = "https://jservice.io/api/random"
    $.ajax({
      url: callUrl3
    }).then(data => {
      console.log(data);
      answer = (data[0].answer);
      $("#displayQ").text(data[0].question);
    });

    $("#subAns").on("click", () => {
      var myAnswer = $("#answer")
      var myAnswerVal = (myAnswer.val().trim())

        if (answer === myAnswerVal) {
          alert("Correct " + answer + " is equal to " + myAnswerVal);
         var xyz =  $("<div>").text("Correct " + answer + " is equal to " + myAnswerVal);
         xyz.attr("class", "ansAlert1")
         $(".ansAlert").append(xyz)
        } else {
          alert("Incorrect " + answer + " is not equal to " + myAnswerVal);

          var abc =  $("<div>").text("Correct " + answer + " is not equal to " + myAnswerVal);
          abc.attr("class", "ansAlert1")
          $(".ansAlert").append(abc);
        };
      myAnswer.val("");

    });
  });

  $("#double").on("click", () => {
    const callUrl = "https://jservice.io/api/clues"
    $.ajax({
      url: callUrl
    }).then(data => {
      console.log(data);
      answer = (data[0].answer);
      var myQuestions = []
      for ( i = 0; i< data.length; i++){
       $("#displayQ").text(data[i].question);
        $("<div>").attr("class", "card").append($("<h5>"));
        // var question = $("<h5>").addClass("card-text").text(data[i].question);
      }
      $("#subAns").on("click", () => {
        var myAnswer = $("#answer")
        var myAnswerVal = (myAnswer.val().trim())
  
          if (answer === myAnswerVal) {
            alert("Correct " + answer + " is equal to " + myAnswerVal);
           var xyz =  $("<div>").text("Correct " + answer + " is equal to " + myAnswerVal);
           xyz.attr("class", "ansAlert1")
           $(".ansAlert").append(xyz)
          } else {
            alert("Incorrect " + answer + " is not equal to " + myAnswerVal);
  
            var abc =  $("<div>").text("Correct " + answer + " is not equal to " + myAnswerVal);
            abc.attr("class", "ansAlert1")
            $(".ansAlert").append(abc);
          };
        myAnswer.val("");
  
      });

      console.log(myQuestions)
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

