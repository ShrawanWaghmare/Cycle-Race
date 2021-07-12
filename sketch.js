var road, roadImage;
var playerCyclist, playerCyclistImage1, playerCyclistImage2;
var player1, player1Image1, player1Image2;
var player2, player2Image1, player2Image2;
var player3, player3Image1, player3Image2;
var pinkGroup, yellowGroup, redGroup;
var cycleBell;

var distance=0;

var gameOver, gameOverImg;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
 
roadImage= loadImage("images/Road.png");
cycleBell= loadSound("sound/bell.mp3");  
  
playerCyclistImage1= loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png"); 
playerCyclistImage2= loadAnimation("images/mainPlayer3.png"); 
  
player1Image1= loadAnimation("images/opponent1.png","images/opponent2.png");  
player1Image2= loadAnimation("images/opponent3.png");  
  
player2Image1= loadAnimation("images/opponent4.png","images/opponent5.png");  
player2Image2= loadAnimation("images/opponent6.png");
  
player3Image1= loadAnimation("images/opponent4.png","images/opponent5.png");  
player3Image2= loadAnimation("images/opponent6.png");

  gameOverImg= loadImage("images/gameOver.png");
  
}



function setup(){
createCanvas(1200,300);
  
  
  road = createSprite(100,150);
  road.addImage(roadImage);
  road.velocityX = -6;
  
  playerCyclist = createSprite(70,150);
  playerCyclist.addAnimation("cycling",playerCyclistImage1);
  playerCyclist.scale=0.07;
  
  gameOver = createSprite(600,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;
  
  
  playerCyclist.setCollider("circle",0,0,500);
  playerCyclist.debug = false;
  
  pinkGroup = new Group();
  yellowGroup = new Group();
  redGroup = new Group();
}


function draw() {
background(0);
  
 
  if(gameState === PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
    road.velocityX = -(6 + 2*distance/150);
    
    playerCyclist.y= World.mouseY
    
    if(road.x < 0){
    road.x = width/2;  
  }
    
    
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclist();
    } else if (select_oppPlayer == 2) {
      yellowCyclist();
    } else {
      redCyclist();
    }
  }
    
    edges= createEdgeSprites();
    playerCyclist.collide(edges); 
    
    if(keyDown("space")){
      cycleBell.play();
    }
    
    if(pinkGroup.isTouching(playerCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",player1Image2);
     
    }
    
    
    if(yellowGroup.isTouching(playerCyclist)){
     gameState = END;
     player2.velocityY = 0;
     player2.addAnimation("opponentPlayer2",player2Image2);
      
    }
    
    
    if(redGroup.isTouching(playerCyclist)){
     gameState = END;
     player3.velocityY = 0;
     player3.addAnimation("opponentPlayer3",player3Image2);
     
    }
    }else if (gameState === END){
      
      gameOver.visible = true; 
      
      road.velocityX=0;
      
      
  
      
      playerCyclist.addAnimation("running", playerCyclistImage2);
      
      
     pinkGroup.setVelocityXEach(0);
    pinkGroup.setLifetimeEach(-1);
  
    yellowGroup.setVelocityXEach(0);
    yellowGroup.setLifetimeEach(-1);
  
    redGroup.setVelocityXEach(0);
    redGroup.setLifetimeEach(-1); 
    }
  
  
  
    

  
  
  
 

 
   
  
  
  
  
drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);

} 

function pinkCyclist(){
        player1 =createSprite(1200,Math.round(random(50, 250)));
        player1.scale =0.07;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",player1Image1);
        player1.setLifetime=170;
        pinkGroup.add(player1);
}

function yellowCyclist(){
        player2 =createSprite(1200,Math.round(random(50, 250)));
        player2.scale =0.07;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",player2Image1);
        player2.setLifetime=170;
        yellowGroup.add(player2);
}

function redCyclist(){
        player3 =createSprite(1200,Math.round(random(50, 250)));
        player3.scale =0.07;
        player3.velocityX = -(6 + 2*distance/150);6
        player3.addAnimation("opponentPlayer3",player3Image1);
        player3.setLifetime=170;
        redGroup.add(player3);
}
