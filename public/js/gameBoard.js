$(".btn-danger").on("click", function (e) {
    const input = $("#quesForm")
    console.log(input)
    let userQuestion = $("#questionSubmit").val()
    let userQuestoinText = $("#questionSubmit").text()
    console.log(userQuestion)
    console.log(userQuestoinText);
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
                    $("#quesForm")[0].reset() 
                }else {
                    $("#quesForm")[0].reset()
                }
            }
        }
    }).catch(err => console.log(err))
})