$("#healthForm").submit(function(e){

    e.preventDefault();

    const data = {

        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),

        lateSleep: $("#lateSleep").is(":checked"),
        noExercise: $("#noExercise").is(":checked"),

        fatigue: $("#fatigue").is(":checked"),
        insomnia: $("#insomnia").is(":checked"),
        cramp: $("#cramp").is(":checked"),
        constipation: $("#constipation").is(":checked")

    };

    $.ajax({

        url: "YOUR_GAS_URL",

        method: "POST",

        data: JSON.stringify(data),

        contentType: "application/json",

        success:function(){

            alert("問卷已送出");

        }

    });

});