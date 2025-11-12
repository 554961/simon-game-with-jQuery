//-------------------------------------------------------
// TODO:
//      1. CHECK & COMPARE USING THE LENGTH OF THE 'orderOfColorsToPress' ARRAY 
//          IF THE USER HAS FAILED OR NOT
//-------------------------------------------------------




// create sounds for playing them inside checkClick()
const blueSFX = new Audio("sounds/blue.mp3");
const greenSFX = new Audio("sounds/green.mp3");
const yellowSFX = new Audio("sounds/yellow.mp3");
const redSFX = new Audio("sounds/red.mp3");
const wrongSFX = new Audio("sounds/wrong.mp3");


var levelNumber = 1;
var isInit = false;
var isGameOver = false;

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
                // start/reset game
                $("#level-title").text("level 1")
                $("#among_startup")[0].play();
                // $("#coc_startup")[0].play();
                orderOfColorsToPress = [];
                usersCombination = [];
                $("#level-title").text("level 1").removeClass("game-over");
                generateRandColor();
                animatePress(orderOfColorsToPress[0]);
            }   
        })
    isInit = true;
    // localStorage.setItem("isInit", true); //doesnt work
};

// check which color is clicked
function checkClick()
{
    //play sounds dynamically
    $('#blue').click(e => blueSFX.play());
    $('#green').click(e => greenSFX.play());
    $('#red').click(e => redSFX.play());
    $('#yellow').click(e => yellowSFX.play());

    //checking if color clicked
    $("#green").click(function()
    {
        
        console.log("green clicked");
        animatePress("green");
        usersCombination.push("green");
        console.log("users: " + usersCombination);

        //using the lenght to check if we should checkCombination
        if (orderOfColorsToPress.length  === usersCombination.length )
            {
                checkCombination();
            }


    });
    $("#red").click(function()
    {
        console.log("red clicked");
        
        animatePress("red");
        usersCombination.push("red");
        console.log("users: " + usersCombination);
        if (orderOfColorsToPress.length === usersCombination.length )
            {
                checkCombination();
            }

    });
    $("#yellow").click(function()
    {
        console.log("yellow clicked");

        animatePress("yellow");
        usersCombination.push("yellow");
        console.log("users: " + usersCombination);
        if (orderOfColorsToPress.length  === usersCombination.length )
            {
                checkCombination();
            }

    });
    $("#blue").click(function()
    {
        console.log("blue clicked");
        animatePress("blue");
        usersCombination.push("blue");
        console.log("users: " + usersCombination);
        if (orderOfColorsToPress.length  === usersCombination.length )
            {
                checkCombination();
            }


            
    });
    
}

// checks if the userse combination clicked is the same random one
function checkCombination()
{
    console.log("CHECKING COMBINATION:");
    console.log("users combination: " + usersCombination);
    console.log("current random order: " + orderOfColorsToPress);

    for (i = 0; i < usersCombination.length; i++){
        if (orderOfColorsToPress[i] === usersCombination[i])
            {
                
                console.log("valid combination");
                // then RESET users COMBO
                
            }
        else 
            {
                console.log("NOT valid combination");
                console.log()
                isGameOver = true;
                
                $("#level-title").text("GAME OVER").addClass("game-over");
                break;
            }
    }

    //RESET USER COMBO AFTER CHECKING
    usersCombination = [];

    // then add a new random color after checking if the arrays are equal
    generateRandColor();
    updateLevelNum();
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

    console.log("new random order: " + orderOfColorsToPress);

    
    
}

//update current level
async function updateLevelNum()
{
    if (isGameOver) return;
    levelNumber++;
    $("#level-title").text("level " + levelNumber);
    for (i = 0; i < orderOfColorsToPress.length; i++)
    {
        await sleep(1000);
        animatePress(orderOfColorsToPress[i]);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");   
    }, 100);
}


function main()
{
    checkClick();
}



// Main program
//Setup game once
if (!isInit) initGame();
isInit = true;

main()