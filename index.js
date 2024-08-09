var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userChosenPattern = [];

var level = 0;
var started = false;

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
      }, 100);
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userChosenPattern[currentLevel]) {
        if (gamePattern.length == userChosenPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }   else {
        $("body").addClass("game-over");
        new Audio("./sounds/wrong.mp3").play();
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userChosenPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(document).keypress(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
});

$(".btn").click(function(event){
    userChosenPattern.push(event.target.id);
    $("#" + event.target.id).fadeOut(100).fadeIn(100);
    playSound(event.target.id);
    animatePress(event.target.id);

    checkAnswer(userChosenPattern.length-1);
})

    