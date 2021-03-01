$(".btn-danger").on("click", function (e) {
    const input = $("#quesForm")
    console.log(input)
    let userQuestion = $(this).parent().prev().find('input').val()
    console.log(userQuestion)
    const questId = +$(this).parents(".questionId").attr("id").split("-")[1]
    console.log(questId)
    const catId = +$(this).parents(".questionId").siblings(".categoryTile").attr("data-val")
    console.log(catId)
    $.get("/api/gameBoard/answerCheck/" + catId, ).then(function(data) {
        console.log(data)
    }).catch(err => console.log(err))
    // $.get("/api/gameBoard").then(data => {
    //     console.log(data)
    //     for (let c = 0; c < data.length; c++) {
    //         let dataClues = data[c].clues
    //         for (let q = 0; q < dataClues.length; q++) {
    //             let ansId = dataClues[q].id
    //             if (questId === ansId) {
    //                 let gameQuestion = dataClues[q].answer
    //                 console.log(gameQuestion)
    //                 console.log(gameQuestion === userQuestion)
    //                 $("#quesForm")[0].reset() 
    //             }else {
    //                 $("#quesForm")[0].reset()
    //                 console.log("no match")
    //             }
    //         }
    //     }
    // }).catch(err => console.log(err))
})