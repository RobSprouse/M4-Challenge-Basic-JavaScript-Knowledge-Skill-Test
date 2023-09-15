let jsonString = JSON.stringify(questionList);
localStorage.setItem("questionList", jsonString);
let retrievedString = localStorage.getItem("questionList");
let retrievedObject = JSON.parse(retrievedString);

$(".timerDiv").hide();
$(".questionsDiv").hide();
$(".multipleChoiceAnswersDiv").hide();

let timeLeft = 60;
let splicedQuestions = [];

// COMMENT: Function to shuffle an array (Fisher-Yates shuffle)


function displayQuestion() {

  let questionIndex = Math.floor(Math.random() * retrievedObject.length);

  let questionAsked = retrievedObject[questionIndex];

  splicedQuestions.push(questionAsked);

  $("#questions").text(questionAsked.question);
  console.log("Question: " + questionAsked.question);

  $("#multipleChoice").empty();

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

  retrievedObject.splice(questionIndex, 1);
}

function checkAnswer(question, selectedChoice) {
  if (selectedChoice !== question.answer) {
    // timeLeft -= 10;
  }

  if (splicedQuestions.length <= 9) {
    displayQuestion();
  } else {
    alert("Quiz finished! Your score is: ");
  }
}



$("#startTest").click(function () {
  $(".instructionsDiv").hide();
  $(".buttonDiv").hide();
  $(".timerDiv").show();
  $(".questionsDiv").show();
  $(".multipleChoiceAnswersDiv").show();
  displayQuestion();
});

