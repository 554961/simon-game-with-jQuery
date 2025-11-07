var levelNumber = 1;
var isInit = false;

var orderOfColorsToPress = [];
var usersCombination = [];

// coroutine for init
function initGame()
{
    if (isInit) return;

    $(document).keydown(function(event)
        {
            if (event.key == "a")
            {
                // start game
                $("#level-title").text("level 1")
                $("#startup")[0].play();
                orderOfColorsToPress = [];
            }   
        })
    isInit = true;
    // localStorage.setItem("isInit", true); //doesnt work
};

// check which color is clicked
function checkClick()
{
    
    $("#green").click(function()
    {
        console.log("green clicked");
        animatePress("green");
        usersCombination.push("green");
        console.log("users: " + usersCombination);
        checkCombination();
    });
    $("#red").click(function()
    {
        console.log("red clicked");
        animatePress("red");
        usersCombination.push("red");
        console.log("users: " + usersCombination);
        checkCombination();
    });
    $("#yellow").click(function()
    {
        console.log("yellow clicked");
        animatePress("yellow");
        usersCombination.push("yellow");
        console.log("users: " + usersCombination);
        checkCombination();
    });
    $("#blue").click(function()
    {
        console.log("blue clicked");
        animatePress("blue");
        usersCombination.push("blue");
        console.log("users: " + usersCombination);
        checkCombination();
    });
    
}

// checks if the userse combination clicked is the same random one
function checkCombination()
{
    if (usersCombination == orderOfColorsToPress) generateRandColor();
    else 
    {
        console.log("game over");
        
        $("#level-title").text("GAME OVER").addClass("game-over");
    }
}

function generateRandColor()
{
    randomNum = Math.floor(Math.random() * 4) + 1;
    let color = "";
    if (randomNum == 1) color = "blue";
    else if (randomNum == 2) color = "red";
    else if (randomNum == 3) color = "green";
    else if (randomNum == 4) color = "yellow";

    orderOfColorsToPress.push(color);

    console.log(orderOfColorsToPress);
}

function updateLevelNum(num)
{
    $("#level-title").text("level " + num)
}

function animatePress(currentColor){
    console.log("animating");
    $("#" + currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");   
    }, 100);
}


function main()
{
    generateRandColor();

    checkClick();
}


// Main program

//Setup game once
if (!isInit) initGame();
isInit = true;

main()