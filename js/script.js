
let questionsAsked = [];

const questions = [{
        question: "Qual dessas linguagens não é considerada uma linguagem de programação?",
        answers: ["CSS", "HTML", "C++", "Java Script"],
        correct: "ans1"
    },

    {
        question: "Quais são os resultados possíveis que um tipo boleano pode assumir?",
        answers: ["true, false", "true, possible, false", "maybe, true, false", "possible, true"],
        correct: "ans0"
    },

    {
        question: "Para que serve o operador aritmético de módulo %?",
        answers: ["Calcular porcentagens", " Realizar cálculos aritméticos de investimentos", "Retornar o módulo matemático (valor absoluto)", " Calcular o resto de uma divisão inteira"],
        correct: "ans3"
    },

    {
        question: "Qual dos seguintes é um operador de concatenação de strings válido?",
        answers: ["*", "->", "+", ";"],
        correct: "ans2"
    },

    {
        question: "Oque significa a sigla HTML",
        answers: ["Hyper Tonto Maluco Legal", "Hyper Text Markup Language", "Hey Trade More Laguage", "Hyper Text Mark Lang"],
        correct: "ans1"
    },

    {
        question: "Quais dessas linguagens é considerada uma linguagem de marcação?",
        answers: ["PHP", "CSS", "HTML", "C++"],
        correct: "ans2"
    },
];

var amtQuestions = questions.length - 1;

makeQuestion(amtQuestions);

function makeQuestion(maxQuestions){
    let rand = (Math.random() *maxQuestions).toFixed();
    rand = Number(rand);
    console.log("A pergunta sorteada foi a " + rand);

    if(!questionsAsked.includes(rand)){
        questionsAsked.push(rand);
        var questSelecionada = questions[rand].question
        console.log(questSelecionada);

        $("#question").html(questSelecionada);
        $("#question").attr("data-indice", rand);

        for(var i = 0; i < 4; i++){
            $("#ans" + i).html(questions[rand].answers[i]);
        }

        var father = $("answers");
        var button = father.children();

        for(var i = 1; i < button.length; i++){
            father.append(button.eq(Math.floor(Math.random() * button.length)));
        }
      
    }else {
        console.log("A pergunta ja foi feita. Sorteando novamente")
        if(questionsAsked < amtQuestions + 1){
            return makeQuestion(maxQuestions);
        }else{
            $("#msg").html("Parabens! Vc Venceu");
            $("#quiz").addClass("hidden");
            $("#status").removeClass("hidden");
            
        }
    }
}

$(".answer").click(function(){
    if($("#quiz").attr("data-status")!=="travado"){
        
        resetButton();
        
        $(this).addClass("selected");
    }
})


$("#confirm").click(function(){
    var indice = $("#question").attr("data-indice");
    
    var correctAns = questions[indice].correct;

    $(".answer").each(function(){
        if($(this).hasClass("selected")){
            var AnsChosen = $(this).attr("id");
            
            if(correctAns == AnsChosen){
                console.log("Resposta correta");
                nextQuestion();
            }else{
                $("#quiz").attr("data-status", "travado");
                $("#confirm").addClass("hidden");
                $("#"+correctAns).addClass("correct");
                $("#"+AnsChosen).removeClass("selected");
                $("#"+AnsChosen).addClass("err");
                setTimeout(function(){
                    gameOver()
                },2000)
                
            }
        }
    })

});

$("#newGame").click(function(){
    newGame();
})


function nextQuestion(){
    resetButton();
    makeQuestion(amtQuestions);
   
}

function newGame(){
    $("#quiz").attr("data-status", "ok  ")
    questionsAsked = [];
    resetButton();
    makeQuestion(amtQuestions);

    if($(this).hasClass("correct")){
        $(this).removeClass("correct")
    }
    if($(this).hasClass("err")){
        $(this).removeClass("err")
    }

    $("#quiz").removeClass("hidden");
    $("#status").addClass("hidden");
}

function resetButton(){
    $(".answer").each(function(){
        if($(this).hasClass("selected")){
            $(this).removeClass("selected")
        }
        if($(this).hasClass("correct")){
            $(this).removeClass("correct")
        }
        if($(this).hasClass("err")){
            $(this).removeClass("err")
        }
    });
}

function gameOver(){
    $("#quiz").addClass("hidden");
    $("#status").removeClass("hidden");
    $("#msg").html("Game Over");
   
}

