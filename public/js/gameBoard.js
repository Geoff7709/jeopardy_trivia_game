$(".btn-danger").on("click", function (event) {
    event.preventDefault();
    const category_id = +$(this).parents(".questionId").attr("data-category-id");
    const id = +$(this).parents(".questionId").attr("id").split("-")[1]
    const answer = $("#questionSubmit").val()

    $.ajax({
        type: "POST",
        url: '/api/category',
        data: JSON.stringify({ category_id, id, answer }),
        contentType: 'application/json'
    }).then(response => {
        if (response.checkAnswer) {
            console.log(response.checkAnswer)
        } else {
            console.log(response.checkAnswer)
        }
    }).catch(console.log)

})

