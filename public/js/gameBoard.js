$(".btn-danger").on("click", function() {
    const userQuestion = $("#questionSubmit").val()
    console.log(userQuestion)
    const questId = +$(this).parents(".questionId").attr("id").split("-")[1]
    $.get("/api/gameBoard", function() {
        console.log($("id").find(questId))
    } )
})
