var stage: createjs.Stage;
var queue;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var dreel;
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var playerBet = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var sevenImg;
var bannanaImg;
var barImg;
var bellImg;
var blankImg;
var cherriesImg;
var grapesImg;
var orangesImg;


var reel1;
var reel2;
var reel3;
var reels = ["seven", "seven", "seven"];
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var creditstext = new createjs.Text(playerMoney.toString(), "35px Myriad Pro", "red");
var bettext = new createjs.Text(playerBet.toString(), "35px Myriad Pro", "red");
var winningstext = new createjs.Text(winnings.toString(), "35px Myriad Pro", "red");
var jackpottext = new createjs.Text(jackpot.toString(), "35px Myriad Pro", "red");
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function preload(): void {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", init);
    queue.loadManifest([
        { id: "slotmachine", src: "images/slot-machine.png" },
        { id: "spin", src: "images/spin-button.png" },
        { id: "bet1", src: "images/bet-1.png" },
        { id: "betmax", src: "images/bet-max.png" },
        { id: "reset", src: "images/reset.png" },
        { id: "exit", src: "images/exit.png" },
        { id: "seven", src: "images/7.png" },
        { id: "banana", src: "images/banana.png" },
        { id: "bar", src: "images/bars.jpg" },
        { id: "bell", src: "images/bell.png" },
        { id: "blank", src: "images/blank.png" },
        { id: "cherries", src: "images/cherries.jpg" },
        { id: "grapes", src: "images/grapes.png" },
        { id: "orange", src: "images/orange.png" }
    ]);
}

function init(): void {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    gameStart();
}

function handleTick(event): void {
    creditstext.text = playerMoney.toString();
    bettext.text = playerBet.toString();
    winningstext.text = winnings.toString();
    jackpottext.text = jackpot.toString();
    stage.update();
}

function gameStart(): void {
    //buttons
    var slotmachine = new createjs.Bitmap(queue.getResult('slotmachine'));
    stage.addChild(slotmachine);
    var spin = new createjs.Bitmap(queue.getResult('spin'));
    spin.x = 325;
    spin.y = 345;
    stage.addChild(spin);
    var bet1 = new createjs.Bitmap(queue.getResult('bet1'));
    bet1.x = 40;
    bet1.y = 345;
    stage.addChild(bet1);
    var betmax = new createjs.Bitmap(queue.getResult('betmax'));
    betmax.x = 100;
    betmax.y = 345;
    stage.addChild(betmax);
    var reset = new createjs.Bitmap(queue.getResult('reset'));
    reset.x = 190;
    reset.y = 340;
    stage.addChild(reset);
    var exit = new createjs.Bitmap(queue.getResult('exit'));
    exit.x = 190;
    exit.y = 370;
    stage.addChild(exit);
    //textboxes
    creditstext.x = 60;
    creditstext.y = 253;
    stage.addChild(creditstext);
    
    bettext.x = 172;
    bettext.y = 253;
    stage.addChild(bettext);
    
    winningstext.x = 230;
    winningstext.y = 253;
    stage.addChild(winningstext);
    
    jackpottext.x = 292;
    jackpottext.y = 253;
    stage.addChild(jackpottext);

    

    /*
    sevenImg = new createjs.Bitmap(queue.getResult('seven'));
    bannanaImg = new createjs.Bitmap(queue.getResult('bannana'));
    barImg = new createjs.Bitmap(queue.getResult('bar'));
    bellImg = new createjs.Bitmap(queue.getResult('bell'));
    blankImg = new createjs.Bitmap(queue.getResult('blank'));
    cherriesImg = new createjs.Bitmap(queue.getResult('cherries'));
    grapesImg = new createjs.Bitmap(queue.getResult('grapes'));
    orangesImg = new createjs.Bitmap(queue.getResult('oranges'));
    */
    reel1 = new createjs.Bitmap(queue.getResult("seven"));
    reel2 = new createjs.Bitmap(queue.getResult("seven"));
    reel3 = new createjs.Bitmap(queue.getResult("seven"));
    
    reel1.x = 69;
    reel1.y = 155;
    stage.addChild(reel1)
    
    reel2.x = 170;
    reel2.y = 155;
    stage.addChild(reel2);
    
    reel3.x = 282;
    reel3.y = 155;
    stage.addChild(reel3);

    //bet-1
    bet1.addEventListener("mouseover", function () { bet1.alpha = 0.5; stage.update(); });
    bet1.addEventListener("rollout", function () { bet1.alpha = 1; stage.update(); });
    bet1.addEventListener("click", function () {        
        playerBet = 1;
        bettext.text = playerBet.toString();
        stage.update();
    })
    //bet-max
    betmax.addEventListener("mouseover", function () { betmax.alpha = 0.5; stage.update(); });
    betmax.addEventListener("rollout", function () { betmax.alpha = 1; stage.update(); });
    betmax.addEventListener("click", function () {        
        playerBet = 5;
        bettext.text = playerBet.toString();
        stage.update();
    })
    //reset
    reset.addEventListener("mouseover", function () { reset.alpha = 0.5; stage.update(); });
    reset.addEventListener("rollout", function () { reset.alpha = 1; stage.update(); });
    reset.addEventListener("click", function () {
        stage.removeChild(reel1);       
        reel1 = new createjs.Bitmap(queue.getResult("seven"));
        reel1.x = 69;
        reel1.y = 155;
        stage.addChild(reel1);
        stage.removeChild(reel2);        
        reel2 = new createjs.Bitmap(queue.getResult("seven"));
        reel2.x = 170;
        reel2.y = 155;
        stage.addChild(reel2); 
        stage.removeChild(reel3);        
        reel3 = new createjs.Bitmap(queue.getResult("seven"));
        reel3.x = 282;
        reel3.y = 155;
        stage.addChild(reel3);
        resetAll();
        stage.update();
    })
    //exit
    exit.addEventListener("mouseover", function () { exit.alpha = 0.5; stage.update(); });
    exit.addEventListener("rollout", function () { exit.alpha = 1; stage.update(); });
    exit.addEventListener("click", function () {        
        //Redirect the user
        if (confirm("Exit The Game?")) {
            window.location.replace("http://robertthomas.jumpingcrab.com/");

        }
    })
    //spin
    spin.addEventListener("mouseover", function () { spin.alpha = 0.5; stage.update(); });
    spin.addEventListener("rollout", function () { spin.alpha = 1; stage.update(); });

    /* When the player clicks the spin button the game kicks off */
    spin.addEventListener("click", function () {
        if (playerBet != 0) {
            if (playerMoney == 0) {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    resetAll();
                }
            }
            else if (playerBet > playerMoney) {
                alert("You don't have enough Money to place that bet.");
            }
            else if (playerBet <= playerMoney) {
                dreel = Reels();
                playerMoney -= playerBet;
                determineWinnings();

                stage.removeChild(reel1);
                stage.removeChild(reel2);
                stage.removeChild(reel3);

                reel1 = new createjs.Bitmap(queue.getResult(dreel[0]));
                reel2 = new createjs.Bitmap(queue.getResult(dreel[1]));
                reel3 = new createjs.Bitmap(queue.getResult(dreel[2]));

                reel1.x = 69;
                reel1.y = 155;
                stage.addChild(reel1)

                reel2.x = 170;
                reel2.y = 155;
                stage.addChild(reel2);

                reel3.x = 282;
                reel3.y = 155;
                stage.addChild(reel3);
            }
        }
        else {
            alert("Please enter a bet amount");
        }
    })
  
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    playerBet = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
               // reels[spin].image = blankImg;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "grapes";
                grapes++;
               // reels[spin].image = grapesImg;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "cherries";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        resetFruitTally();
        checkJackPot();
    }
    else {
        resetFruitTally();
        winnings = 0;
    }

}