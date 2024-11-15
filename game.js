var buttonColours = ["btn-tl", "btn-tc", "btn-tr", "btn-ml", "btn-mc", "btn-mr", "btn-bl", "btn-bc", "btn-br"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var highScore = 0;
var isSequencePlaying = false; 

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (!isSequencePlaying) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").html("Game Over!<br>Press Any Key to Restart");


    if (level > highScore) {
      highScore = level - 1;
      $("#high-score").text("High Score: " + highScore);
    }

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 9);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSequence(function() {
    isSequencePlaying = false;
  });
}

function playSequence(callback) {
  isSequencePlaying = true;
  let i = 0;

  function playStep() {
    if (i < gamePattern.length) {
      var currentColour = gamePattern[i];
      $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
      i++;
      setTimeout(playStep, 600);
    } else {
      if (typeof callback === "function") {
        setTimeout(callback, 100);
      }
    }
  }

  playStep();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  isSequencePlaying = false;
}
