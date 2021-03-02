$(".btn-danger").on("click", function (event) {
    event.preventDefault();
    const category_id = +$(this).parents(".questionId").attr("data-category-id");
    const value = +$(this).parents(".questionId").attr("data-value");
    const id = +$(this).parents(".questionId").attr("id").split("-")[1]
    const getScore = +document.getElementById('currentScore').innerHTML
    const answer = $(this).parent().siblings('div.modal-body').children('textarea').val()

    
    $.ajax({
        type: "POST",
        url: '/api/category',
        data: JSON.stringify({ category_id, id, answer }),
        contentType: 'application/json'
    }).then(response => {
        if (response.checkAnswer) {
            const newScore = getScore + value;
            document.getElementById('currentScore').innerHTML = newScore;
            $(this).parent().siblings('div.modal-body').children('textarea').val('')
            $(this).parents('.questionId').prev().children().children().attr({"class": "disabled btn btn-secondary btn-primary btn-lg", "href": " "})
            
                
            // disabled.createAttribute('class', 'disabled');
        } else {
            const newScore = getScore - value;
            document.getElementById('currentScore').innerHTML = newScore;
            $(this).parent().siblings('div.modal-body').children('textarea').val('')
            $(this).parents('.questionId').prev().children().children().attr({"class": "disabled btn btn-secondary btn-primary btn-lg", "href": " "})
            // disabled.createAttribute('class', 'disabled');
        }
    }).catch(console.log)

})

$(".btnPass").on("click", function (event) {
    event.preventDefault();
    const getScore = +document.getElementById('currentScore').innerHTML
    const value = +$(this).parents(".questionId").attr("data-value");
    const newScore = getScore - value;
    document.getElementById('currentScore').innerHTML = newScore;
    $(this).parent().siblings('div.modal-body').children('textarea').val('')
    $(this).parents('.questionId').prev().children().children().attr({"class": "disabled btn btn-secondary btn-primary btn-lg", "href": " "})    
})

