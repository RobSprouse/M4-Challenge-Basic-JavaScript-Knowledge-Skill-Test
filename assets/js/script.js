// let jsonString = JSON.stringify(questionList);
// localStorage.setItem("questionList", jsonString);
// let retrievedString = localStorage.getItem("questionList");
// let retrievedObject = JSON.parse(retrievedString);

$(".timerDiv").hide();
$(".questionsDiv").hide();
$(".multipleChoiceAnswersDiv").hide();

let timeLeft = 60;
let splicedQuestions = [];
let compiledQuestion = [];

function compileQuestions() {
  if (compiledQuestion.length === 0) {
    while (compiledQuestion.length < 10) {
      let questionIndex = Math.floor(Math.random() * questionList.length);
      compiledQuestion.push(questionList[questionIndex]);
      questionList.splice(questionIndex, 1);
    }
  }
  let jsonString = JSON.stringify(compiledQuestion);
  localStorage.setItem("compiledQuestions", jsonString);
}


  function displayQuestion() {
    let retrievedString = localStorage.getItem("compiledQuestions");
    let retrievedCompiledQuestions = JSON.parse(retrievedString);
    let questionAsked = retrievedCompiledQuestions.shift();
    let jsonString = JSON.stringify(retrievedCompiledQuestions);
    localStorage.setItem("compiledQuestions", jsonString);

    compiledQuestion = retrievedCompiledQuestions;
  

  console.log("logging compiledQuestion " + compiledQuestion)
  console.log("logging questionAsked" + questionAsked)

  localStorage.setItem("questionAsked", JSON.stringify(questionAsked));
  
  console.log("logging questionAsked" + questionAsked)
  
  splicedQuestions.push(questionAsked);
  

  document.getElementById("questions").textContent = questionAsked.question;

  console.log("Question: " + questionAsked.question);

  $("#multipleChoice").empty();

  // COMMENT: Function to shuffle an array (Fisher-Yates shuffle)
  function choicesShuffled(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let choices = choicesShuffled(questionAsked.multipleChoice);

  for (let i = 0; i < choices.length; i++) {
    let li = $("<li></li>").text(choices[i]);
    li.click(function () {
      checkAnswer(questionAsked, $(this).text());
    });
    $("#multipleChoice").append(li);
  }

}

function checkAnswer(question, selectedChoice) {
  if (selectedChoice !== question.answer) {
    alert("wrong")
    // timeLeft -= 10;
  }

  if (selectedChoice === question.answer) {
    alert("right")
  }

  let retrievedString = localStorage.getItem("compiledQuestions");
  let retrievedCompiledQuestions = JSON.parse(retrievedString);

  if (retrievedCompiledQuestions.length != 0) {
    displayQuestion();
  } else {
    alert("Quiz finished! Your score is: ");
  }
}



$("#startTest").click(function () {
  compileQuestions()
  console.log("logging compiledQuestion " + compiledQuestion)
  $(".instructionsDiv").hide();
  $(".buttonDiv").hide();
  $(".timerDiv").show();
  $(".questionsDiv").show();
  $(".multipleChoiceAnswersDiv").show();
  displayQuestion();
});

