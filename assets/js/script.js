console.log("JS is connected.");

$(".timerDiv").hide();
$(".questionsDiv").hide();
$(".multipleChoiceAnswersDiv").hide();

$("#startTest").click(function () {
  $(".instructionsDiv").hide();
  $(".buttonDiv").hide();
  $(".timerDiv").show();
  $(".questionsDiv").show();
  $(".multipleChoiceAnswersDiv").show();

  displayQuestion();
});

let timeLeft = 60;
let splicedQuestions = [];
let questionIndex = "";

let timer = setInterval(function () {
  if (timeLeft <= 0) {
    alert("Time's up!");
    clearInterval;
    return;
  } else {
    $("#timer").text(timeLeft + " seconds remaining");
  }
  timeLeft -= 1;
}, 1000);

function displayQuestion() {
  let questionIndex = Math.floor(Math.random() * questionList.length);

  let questionAsked = questionList[questionIndex];
  console.log(questionAsked);

  splicedQuestions.push(questionAsked);

  $("#questions").text(questionAsked.question);
  console.log("Question: " + questionAsked.question);

  $("#multipleChoice").empty();

  let choices = choicesShuffled(questionAsked.multipleChoice);

  for (let i = 0; i < choices.length; i++) {
    let li = $("<li></li>").text(choices[i]);
    li.click(function () {
      checkAnswer(questionAsked, $(this).text());
    });
    $("#multipleChoice").append(li);
  }

  questionList.splice(questionIndex, 1);
}

function checkAnswer(question, selectedChoice) {
  if (selectedChoice !== question.answer) {
    timeLeft -= 10;
  }

  if (splicedQuestions.length <= 9) {
    displayQuestion();
    console.log(questionList.length);
    console.log("spliced question length: " + splicedQuestions.length);
  } else {
    alert("Quiz finished! Your score is: ");
  }
}

// COMMENT: Function to shuffle an array (Fisher-Yates shuffle)
function choicesShuffled(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// TODO: Set style changes to answers chosen, right, wrong
