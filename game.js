
  var canvas;
  var canvasContext;
  var ballX = 50;
  var ballSpeedX = 10;
  var ballY = 50;
  var ballSpeedY = 10;

  var player1Score = 0;
  var player2Score = 0;
  const Winning_Score = 3;

  var showingWinScreen = false;

  var paddle1Y = 250 ;
  var paddle2Y = 250 ;
  const PADDLE_HEIGHT = 100;
  const PADDLE_THICKNESS= 10;

  function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
      x:mouseX,
      y:mouseY
    };


  }
  function handleMouseClick (evt) {
    if (showingWinScreen) {
      player1Score = 0;
      player2Score = 0;
      showingWinScreen = false ;
    }
  }

  window.onload = function() {

	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
  var FPS = 30;


  setInterval(callBoth, 1000/FPS);

	canvas.addEventListener('mousedown', handleMouseClick) ;

  canvas.addEventListener('mousemove',
      function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);

      });

}



function callBoth(){
  moveEverything();
  drawEverything();
}
function ballReset() {
  if (player1Score >= Winning_Score ||
  player2Score >= Winning_Score) {

    showingWinScreen = true;
  }
  ballSpeedX = -ballSpeedX ;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

 function computermovement () {
   var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
   if (paddle2YCenter < ballY - 35) {
     paddle2Y +=  6;

   }
   else if (paddle2YCenter > ballY - 35)  {

      paddle2Y -=  6;
   }
 }


function moveEverything() {
  if (showingWinScreen) {
    return;
  }
  computermovement () ;

      ballX +=  ballSpeedX ;
    ballY +=  ballSpeedY ;

    if(ballX < 0  ){
      if(ballY >paddle1Y &&
         ballY < paddle1Y + PADDLE_HEIGHT ) {
           ballSpeedX = -ballSpeedX ;
           var deltaY = ballY - (paddle1Y - PADDLE_HEIGHT/2) ;

         } else {
          player2Score ++; // must be before ball ballReset
          ballReset ();

         }

    }
    if(ballY < 0  ){
      ballSpeedY = -ballSpeedY ;

    }
    if(ballX > canvas.width  ){
        if(ballY >paddle2Y &&
           ballY < paddle2Y + PADDLE_HEIGHT ) {
             ballSpeedX = -ballSpeedX ;
             var deltaY = ballY - (paddle2Y - PADDLE_HEIGHT/2) ;

           } else {
             player1Score ++; // must be before ball ballReset
            ballReset ();
         }
    }
    if(ballY > canvas.height  ){
      ballSpeedY = -ballSpeedY ;
    }

}

//next function draws the net
function drawNet() {
	for(var i=0;i<canvas.height;i+=40) {
    canvasContext.fillStyle = 'orange';
  	canvasContext.fillRect(canvas.width/2-1,i,2,20);
	}
}
function drawEverything (){

  //next line blanks out the screen with black
  canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0,canvas.width,canvas.height);

  if (showingWinScreen) {
    canvasContext.fillStyle = "white " ;

    if (player1Score >= Winning_Score)  {
      canvasContext.fillText("WOOHOO YOU WON !!" ,350 , 200);
    }
    else if (player2Score >= Winning_Score) {
      canvasContext.fillText("COMPUTER WON._." ,350 , 200);
    }

      canvasContext.fillStyle = 'white';
      canvasContext.fillText("CLICK TO PLAY AGAIN ", 350, 500);
    return;

}
    drawNet() ;

  //next line is the left blue paddle
  canvasContext.fillStyle = 'green';
	canvasContext.fillRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT);

  //next line is the right computer paddle
  canvasContext.fillStyle = 'blue';
	canvasContext.fillRect(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT);

  //next line is the ball
  canvasContext.fillStyle = 'yellow';
  canvasContext.beginPath();
  canvasContext.arc(ballX,ballY, 10, 0,Math.PI*2,true);
  canvasContext.fill();

  canvasContext.fillText("SCORE",380,33);
  canvasContext.fillText(player1Score,100,100);
  canvasContext.fillText(player2Score,canvas.width - 100, 100);
}
