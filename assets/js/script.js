console.log("JS is connected.");

// TODO: assign objects: timerDiv, timer span, instructionsDiv, buttonDiv,
// TODO:                 startTest button, questionsDiv, questions p, multipleChoiceAnswersDiv, multipleChoice list

// let timerDiv = $(".timerDiv")
// let timer = $("#timer")
// let instructionsDiv = $(".instructionsDiv")
// let buttonDiv = $(".buttonDiv")
// let startTest = $("#startTest")
// let questionsDiv = $(".questionsDiv")
// let questions = $("#questions")
// let multipleChoice = $("#multipleChoice")

$(".timerDiv").hide();
$(".questionsDiv").hide();
$(".multipleChoiceAnswersDiv").hide();

$("#startTest").click(function () {
  $(".instructionsDiv").hide();
  $(".buttonDiv").hide();
  $(".timerDiv").show();
  $(".questionsDiv").show();
  $(".multipleChoiceAnswersDiv").show();
});
