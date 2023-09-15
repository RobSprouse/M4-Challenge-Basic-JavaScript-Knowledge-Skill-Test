console.log("JS is connected.");


$(".timerDiv").hide();
$(".questionsDiv").hide();
$(".multipleChoiceAnswersDiv").hide();

let timeLeft = 60;
let questionAsked = [] // TODO:


$("#startTest").click(function () {
  $(".instructionsDiv").hide();
  $(".buttonDiv").hide();
  $(".timerDiv").show();
  $(".questionsDiv").show();
  $(".multipleChoiceAnswersDiv").show();
  displayQuestion(); 
});

let timer = setInterval(function () {
  if(timeLeft <= 0) {
    clearInterval(timer);
    alert("Time's up!");
    // TODO: add code after time is up
  } else {
    $("#timer").text(timeLeft + " seconds remaining")
  }
  timeLeft -= 1;
}, 1000)

function displayQuestion() {
    
  timer

    // TODO: make only ten questions
    let questionIndex = Math.floor(Math.random() * questionList.length);
  
    let questionAsked = questionList[questionIndex];
    
    questionList.splice(questionIndex, 1)

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

  questionList.splice(questionIndex, 1);
}

function checkAnswer(question, selectedChoice) {
  if (selectedChoice !== question.answer) {
    timeLeft -= 10;
  }
// TODO: add some type of notification when they get an answer right or wrong.

  if (questionList.length > 0) {
    displayQuestion(); 
  } else {
    alert("Quiz finished! Your score is:"); // TODO: figure out scoring system and add to highscores local storage
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