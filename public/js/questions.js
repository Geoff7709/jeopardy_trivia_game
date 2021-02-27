$(document).ready(() => {
  $("#single").on("click", () => {
    window.location.replace("http://localhost:8080/gameBoard?type=single");
  })

  $("#double").on("click", () => {
    window.location.replace("http://localhost:8080/gameBoard?type=double");
  })
});

