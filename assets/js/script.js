$(".timerDiv").hide();
$(".questionsDiv").hide();
$(".multipleChoiceAnswersDiv").hide();
$(".scoreDiv").hide();
$(".resultDiv").hide();

let timeLeft = 60;
let splicedQuestions = [];
let compiledQuestions = [];
let timer;
let score

function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Your time is up. You have a score of 0")
      location.reload();
    } else {
      $("#timer").text(timeLeft + " seconds remaining");
    }
    timeLeft -= 1;
  }, 1000);
}

// COMMENT: Compiles random questions from questionList that will be assigned into an array questions will be drawn from.
function compileQuestions() {  
  if (compiledQuestions.length === 0) {
    while (compiledQuestions.length < 10) {
      let questionIndex = Math.floor(Math.random() * questionList.length);
      compiledQuestions.push(questionList[questionIndex]);
      questionList.splice(questionIndex, 1);
    }
  }
}

// COMMENT: Handles the assignment of the questions displayed, how the choices are displayed, and how they're checked.
function displayQuestion() {
  $("#result").empty

  let questionAsked = compiledQuestions[0]
  compiledQuestions.splice(0, 1)

  $("#questions").text(questionAsked.question);

  $("#multipleChoice").empty();

  let choices = choicesShuffled(questionAsked.multipleChoice);

  for (let i = 0; i < choices.length; i++) {
    let li = $("<li></li>").text(choices[i]);
    li.click(function () {
      checkAnswer(questionAsked, $(this).text());
    });
    $("#multipleChoice").append(li);
  }

    // COMMENT: Function to shuffle an array (Fisher-Yates shuffle)
    function choicesShuffled(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
  function checkAnswer(question, selectedChoice) {
    if (selectedChoice !== question.answer) {
      $("#result").text("Incorrect! Ten points have been deducted.");
      timeLeft -= 10;
    } else {
      $("#result").text("Correct!");
    }

    if (compiledQuestions.length != 0) {
      $("#multipleChoice").empty();
      displayQuestion();
    } else {
      clearInterval(timer);
      $(".timerDiv").hide();
      $(".questionsDiv").hide();
      $("#multipleChoice").empty();
      $("#timerDiv").hide();    
      $(".questionsDiv").hide();
      $(".multipleChoiceAnswersDiv").hide();
      $(".scoreDiv").show();
      $("#score").text(timeLeft);
      $("#result").text("Click here to enter your initials!");
    }
  }
}

$("#startTest").click(function () {
  startTimer();
  compileQuestions();
  $(".instructionsDiv").hide();
  $(".buttonDiv").hide();
  $(".timerDiv").show();
  $(".questionsDiv").show();
  $(".multipleChoiceAnswersDiv").show();
  $(".resultDiv").show();
  displayQuestion();
});