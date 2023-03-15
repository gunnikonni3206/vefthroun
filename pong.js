var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddleHeight = 100;
var paddleWidth = 10;
var paddle1Y = (canvas.height - paddleHeight) / 2;
var paddle2Y = (canvas.height - paddleHeight) / 2;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function move() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    if (ballY < 0 || ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
  
    if (ballX < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }
  
    if (ballX > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }
  
    canvas.addEventListener("mousemove", function(event) {
      var mousePos = calculateMousePos(event);
      paddle1Y = mousePos.y - (paddleHeight/2);
    });
  }
  

  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 38) {
      paddle2Y -= 20;
    } else if (event.keyCode == 40) {
      paddle2Y += 20;
    }
  });

function calculateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function gameLoop() {
  draw();
  move();
}

setInterval(gameLoop, 30);
