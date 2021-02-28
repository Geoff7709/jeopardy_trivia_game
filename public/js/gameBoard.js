$(".btn-danger").on("click", function () {
    const form = $("#quesForm")
    let userQuestion = $("#questionSubmit").val()
    console.log(userQuestion)
    const questId = +$(this).parents(".questionId").attr("id").split("-")[1]
    console.log(questId)
    $.get("/api/gameBoard").then(data => {
        console.log(data)
        for (let c = 0; c < data.length; c++) {
            let dataClues = data[c].clues
            for (let q = 0; q < dataClues.length; q++) {
                let ansId = dataClues[q].id
                if (questId === ansId) {
                    let gameQuestion = dataClues[q].answer
                    console.log(gameQuestion)
                    console.log(gameQuestion === userQuestion)
                    form.trigger("reset")
                }
            }
        }
    }).catch(err => console.log(err))
})