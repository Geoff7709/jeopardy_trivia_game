$(document).ready(function () {
    setTimeout(function () {
        const user = $(".gameBoard").attr("data-user");
        const highScore = +$(".gameBoard").attr("data-highscore");
        const getScore = +document.getElementById("currentScore").innerHTML;

        $.ajax({
            type: "POST",
            url: "/api/currentScore",
            data: JSON.stringify({ currentScore: getScore, id: +user, highScore }),
            contentType: "application/json"
        }).then(() => {
            window.location.replace("/highScore");
        }).catch(() => {
            window.location.replace("/highScore");
        });
    }, 5 * 60 * 1000);

    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = `Timer: ${minutes} : ${seconds}`;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000)
    };
    window.onload = function () {
        let fiveMinutes = 60 * 5,
            display = document.getElementById("timer");
        startTimer(fiveMinutes, display);
    };


    $(".btn-danger").on("click", function (event) {
        event.preventDefault();
        const category_id = +$(this).parents(".questionId").attr("data-category-id");
        const value = +$(this).parents(".questionId").attr("data-value");
        const id = +$(this).parents(".questionId").attr("id").split("-")[1];
        const getScore = +document.getElementById("currentScore").innerHTML;
        const answer = $(this).parent().siblings("div.modal-body").children("textarea").val();

        $.ajax({
            type: "POST",
            url: "/api/category",
            data: JSON.stringify({ category_id, id, answer }),
            contentType: "application/json"
        }).then(response => {
            if (response.checkAnswer) {
                const newScore = getScore + value;
                document.getElementById("currentScore").innerHTML = newScore;
                $(this).parent().siblings("div.modal-body").children("textarea").val("");
                $(this).parents(".questionId").prev().children().children().attr({ "class": "disabled btn btn-secondary btn-primary btn-lg", "href": " " });
            } else {
                const newScore = getScore - value;
                document.getElementById("currentScore").innerHTML = newScore;
                $(this).parent().siblings("div.modal-body").children("textarea").val("")
                $(this).parents(".questionId").prev().children().children().attr({ "class": "disabled btn btn-secondary btn-primary btn-lg", "href": " " });
            }
        }).catch(console.log);
    })

    $(".btnPass").on("click", function (event) {
        event.preventDefault();
        const getScore = +document.getElementById("currentScore").innerHTML;
        const value = +$(this).parents(".questionId").attr("data-value");
        const newScore = getScore - value;
        document.getElementById("currentScore").innerHTML = newScore;
        $(this).parent().siblings("div.modal-body").children("textarea").val("");
        $(this).parents(".questionId").prev().children().children().attr({ "class": "disabled btn btn-secondary btn-primary btn-lg", "href": " " });
    })


    $(".btnPass").on("click", function (event) {
        event.preventDefault();
        const getScore = +document.getElementById('currentScore').innerHTML;
        const value = +$(this).parents(".questionId").attr("data-value");
        const newScore = getScore - value;
        document.getElementById("currentScore").innerHTML = newScore;
        $(this).parent().siblings("div.modal-body").children("textarea").val("");
        $(this).parents(".questionId").prev().children().children().attr({ "class": "disabled btn btn-secondary btn-primary btn-lg", "href": " " });
    })

    $(".exit").on("click", function () {
        window.location.replace("/highScore");
    });
})  