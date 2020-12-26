var ground;
var monkey, monkey_running, monkey_stillImg;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime = 0;
var PLAY = 1, END = 0;
var gameState = PLAY;

function preload(){  
  monkey_stillImg = loadImage("sprite_0.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}


function setup() {
  createCanvas(500,500);
  
  ground = createSprite(250,450,500,200);
  ground.shapeColor = "green";

  score = 0;
  
  invisible = createSprite(250,442,500,200)
  invisible.visible = false;

  monkey = createSprite(90,300,20,20);
  monkey.addAnimation("monkeyy", monkey_running);
  monkey.scale = 0.1;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  background("lightblue");

  fill("black");
  textSize(21);
  text("Survival Time: " + survivalTime, 50, 50);  
  
  fill("white");
  textSize(23);
  stroke("black");
  strokeWeight(4);
  text("SCORE: " + score, 350, 50);


if (gameState===END){
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.visible = false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.visible = false;
    textSize(40);
    fill("red");
    stroke("black");
    strokeWeight(5);      
    text("GAME OVER",120,250);
}
 
  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(ground); 

 if(gameState === PLAY){
  if (keyWentDown("space") && monkey.y > 250){
   monkey.velocityY = -20;  
  console.log("I jumped!")
  }
   
  survivalTime = Math.ceil(frameCount/40);  
  
  bananas();
  obstacles();
   
  if (monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
     score = score + 1;
     console.log ("1 more banana!")          
  }
 }
  
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;        
      monkey.addImage("monkeyStop",monkey_stillImg);
  }
       

  drawSprites();
}

function bananas(){
  if (frameCount%80===0){
    banana = createSprite(499,110,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.debug = false;
    banana.setCollider("rectangle",0,0,460,200);    
    banana.lifetime = 90;
    foodGroup.add(banana);      
  }
}

function obstacles(){
  if (frameCount%300===0){
  obstacle = createSprite(499,330,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6;
  obstacle.scale = 0.2;
  obstacle.lifetime = 90;
  obstacle.debug = false;
  obstacle.setCollider("circle",0,0,160);
  obstacleGroup.add(obstacle);
  }
}

