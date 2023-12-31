// COMMENT: Script file for the Javascript multiple choice test

// COMMENT: Hides the sections not needed initially
$(".timerDiv").hide();
$(".questionsDiv").hide();
$(".multipleChoiceAnswersDiv").hide();
$(".scoreDiv").hide();
$(".resultDiv").hide();
$(".footer").hide();

// COMMENT: Declares variables
let timeLeft = 180;
let compiledQuestions = [];
let timer;
let score;

// COMMENT: Timer Function
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Your time is up. You have a score of 0");
      location.reload();
    } else {
      $("#timer").text(timeLeft + " seconds remaining");
      if (timeLeft <= 20) {
        $("#timer").css("color", "red");
      }
    }
    timeLeft -= 1;
  }, 1000);
}

// COMMENT: Compiles random questions from questionList (questions.js) that will be assigned into an array questions will be drawn from.
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
  let questionAsked = compiledQuestions[0];
  $("#citeQuestion").html(
    '<a href="' +
      compiledQuestions[0].website +'" target="_blank">'
      + compiledQuestions[0].reference + '</a>'

  );
  compiledQuestions.splice(0, 1);

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
}

// COMMENT: Function to shuffle an array (Fisher-Yates shuffle)
function choicesShuffled(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// COMMENT: Function to check answers and display whether or not they are correct. Also ends the displayQuestion() function, hides divs, and displays a score after ten questions
function checkAnswer(question, selectedChoice) {
  if (selectedChoice !== question.answer) {
    $("#result").text(
      "Previous question incorrect! Ten points have been deducted."
    );
    timeLeft -= 18;
  } else {
    $("#result").text("Previous question Correct!");
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
    $("#result").remove();
    $(".footer").hide();
    $("#logScore").text(
      "Click here to enter your initials to keep track of your scores!"
    );
    if (timeLeft < 0) {
      timeLeft = "0";
      $("#score").text(timeLeft);
    } else {
      $("#score").text(timeLeft);
    }
    $("#logScore").click(function () {
      let initials = prompt("Please enter your initials:");
      if (initials != null) {
        let score = timeLeft
        let storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];
        storedScores.push({initials: initials, timeLeft: timeLeft});
        localStorage.setItem("storedScores", JSON.stringify(storedScores));
      }
    });
  }
}

// COMMENT: Executes a function to display the local storage objects as initials and highscores when viewing the highscores.html
$(document).ready(function () {
  if (window.location.href.indexOf("highscores.html") > -1) {
    let storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];
    
    storedScores.sort(function(a, b) {
      return b.timeLeft - a.timeLeft
    });

    let table = $("<table></table>").attr("id", "highScoresTable");
    let headerRow = $("<tr></tr>");
    headerRow.append($("<th></th>").text("Initials"));
    headerRow.append($("<th></th>").text("Score"));
    table.append(headerRow);

    for (let i = 0; i < storedScores.length; i++) {
      let row = $("<tr></tr>");
      row.append($("<td></td>").text(storedScores[i].initials));
      row.append($("<td></td>").text(storedScores[i].timeLeft));
      table.append(row);
    }
    $("#highScoresTableDiv").append(table);
  }
});

// COMMENT: Event listener for the start button which hides/shows divs and starts the test (displayQuestion())

$("#startTest").click(function () {
  startTimer();
  compileQuestions();
  $(".instructionsDiv").hide();
  $(".buttonDiv").hide();
  $(".timerDiv").show();
  $(".questionsDiv").show();
  $(".multipleChoiceAnswersDiv").show();
  $(".resultDiv").show();
  $(".footer").show();
  displayQuestion();
});
