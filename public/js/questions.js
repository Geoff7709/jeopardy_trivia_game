$(document).ready(() => {
  $("#single").on("click", () => {
    window.location.replace("/gameBoard?type=single");
  })

  $("#double").on("click", () => {
    window.location.replace("/gameBoard?type=double");
  })
});

