$(document).ready(() => {
  $("#single").on("click", () => {
    const callUrl3 = "https://jservice.io/api/random"
    $.ajax({
      url: callUrl3
    }).then(data => {
      console.log(data);
    });
  });

  $("#double").on("click", () => {
    const callUrl = "https://jservice.io/api/clues"
    $.ajax({
      url: callUrl
    }).then(data => {
      console.log(data);
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

