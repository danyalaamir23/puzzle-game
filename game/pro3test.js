window.onload = function() {
    var boxes = document.querySelectorAll('.box');
    var btn = document.getElementById("shuffle");
    var mouseDown = false;
    var gameStart = false;
    var totalMoves = 0;

    var startTime; //used to keep track of how long it took to finish the game
    var endTime;

    btn.addEventListener('click', function() { //Shuffle Function for Button
        shuffle();
        gameStart = true;
        startTime = new Date();
    });

    boxes.forEach(function(box) { //every time you interact with a box
        box.addEventListener('mouseover', function(){ //hover function, shows red if its a valid move
            if(isValid(this.id, document.getElementById("bwhite").id)){
                document.getElementById(this.id).style.border = "2px solid red";
                document.getElementById(this.id).style.color = "#006600";
                document.getElementById(this.id).style.textDecoration = "underline";
            }
        });
  
        box.addEventListener('mouseout', function(){ //gets rid of the previous red hover function
            if(isValid(this.id, document.getElementById("bwhite").id)){
                document.getElementById(this.id).style.border = "2px solid black";
                document.getElementById(this.id).style.color = "black";
                document.getElementById(this.id).style.textDecoration = "none";
            }
        });

        box.addEventListener('mousedown', function() { //checks if user clicks on a box
            mouseDown = true;
            if(isValid(this.id, document.getElementById("bwhite").id)) { //if it's a legal move, swap the tiles
                swapBoxes(this.id, document.getElementById("bwhite").id);
            }

            if(gameStart) {
                wonGame();
            }
        }); 

        box.addEventListener('mouseup', function() {
            mouseDown = false;
        });
    });

    function swapBoxes(box1, box2) { //basic swap function, but with two variables per box
        var temp = document.getElementById(box1).style.top;
        var temp2 = document.getElementById(box1).style.left;
        document.getElementById(box1).style.top = document.getElementById(box2).style.top;
        document.getElementById(box1).style.left = document.getElementById(box2).style.left;
        document.getElementById(box2).style.top = temp;
        document.getElementById(box2).style.left = temp2;
        totalMoves++;

    }

    
    function shuffle() { //shuffle game when button is pressed
        for (var i = 0; i < 1000; i++) {        
            var rand = Math.floor((Math.random() * 15) + 1);
            var string1 = "b";
            var string2 = rand.toString();
            var stringValidate = string1.concat(string2);
            if(isValid(stringValidate, document.getElementById("bwhite").id)) {
                swapBoxes(stringValidate, document.getElementById("bwhite").id);
            }        
         }
         totalMoves = 0; //reset move count so the shuffle doesn't interfere with your score
    }

    function isValid(box, bwhite) { //validates if the white square is next to the box
        var bX = parseInt(document.getElementById(box).style.left); //getting integers for X,Y coordinates
        var bY = parseInt(document.getElementById(box).style.top);
        var whiteX = parseInt(document.getElementById(bwhite).style.left);
        var whiteY = parseInt(document.getElementById(bwhite).style.top);

        var temp1 = Math.abs(whiteX-bX); //calculate distance
        var temp2= Math.abs(whiteY-bY);
     
        if(temp1 <= 100 && temp2 <= 100 && temp1 != temp2) { //adjacent is valid, diagonal is not (0px and 100px, but not 100px and 100px apart in terms of x and y)
            return true;
        }
        return false;
    }

    function wonGame(){
        var winCount = 0; //used to see if every tile is in the correct spot

        if(document.getElementById("b1").style.top == "0px" && document.getElementById("b1").style.left == "0px") {
            winCount++;
        }
        if(document.getElementById("b2").style.top == "0px" && document.getElementById("b2").style.left == "100px") {
            winCount++;
        }
        if(document.getElementById("b3").style.top == "0px" && document.getElementById("b3").style.left == "200px") {
            winCount++;
        }
        if(document.getElementById("b4").style.top == "0px" && document.getElementById("b4").style.left == "300px") {
            winCount++;
        }
        if(document.getElementById("b5").style.top == "100px" && document.getElementById("b5").style.left == "0px") {
            winCount++;
        }
        if(document.getElementById("b6").style.top == "100px" && document.getElementById("b6").style.left == "100px") {
            winCount++;
        }
        if(document.getElementById("b7").style.top == "100px" && document.getElementById("b7").style.left == "200px") {
            winCount++;
        }
        if(document.getElementById("b8").style.top == "100px" && document.getElementById("b8").style.left == "300px") {
            winCount++;
        }
        if(document.getElementById("b9").style.top == "200px" && document.getElementById("b9").style.left == "0px") {
            winCount++;
        }
        if(document.getElementById("b10").style.top == "200px" && document.getElementById("b10").style.left == "100px") {
            winCount++;
        }
        if(document.getElementById("b11").style.top == "200px" && document.getElementById("b11").style.left == "200px") {
            winCount++;
        }
        if(document.getElementById("b12").style.top == "200px" && document.getElementById("b12").style.left == "300px") {
            winCount++;
        }
        if(document.getElementById("b13").style.top == "300px" && document.getElementById("b13").style.left == "0px") {
            winCount++;
        }
        if(document.getElementById("b14").style.top == "300px" && document.getElementById("b14").style.left == "100px") {
            winCount++;
        }
        if(document.getElementById("b15").style.top == "300px" && document.getElementById("b15").style.left == "200px") {
            winCount++;
        }

        if(winCount == 15) { //YOU WON!
            endTime = new Date();
            var timeDiff = endTime - startTime;
            timeDiff /= 1000;
            var seconds = Math.round(timeDiff);

            document.getElementById("animation").style.visibility = "visible"; //show the winning notification
            document.getElementById("animation").innerHTML = "Congrats, You Won! Total Moves: " + totalMoves + "  Total Seconds: " + seconds;

            document.getElementById("snowfall").style.visibilty = "visible;" //winning animation
        }
      }

    /*function moveable() { //may use later
        var string1 = "b";
        for(var i = 1; i < 16; i++) {
            var string2 = i.toString();
            var stringValidate = string1.concat(string2);

            if(isValid(stringValidate, document.getElementById("bwhite").id)) {
        
            }
        }
    }*/
}