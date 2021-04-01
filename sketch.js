var towerImage,tower
var doorImage,door,doorsGroup
var climberImage,climber,climberGroup
var ghostImage,ghost
var invisibleBlock,invisibleBlockGroup
var gameState

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png")
}

function setup(){
createCanvas(600,600);
tower = createSprite(300,300);
tower.addImage(towerImage);
tower.velocityY = 1;

ghost = createSprite(200,100);
ghost.addImage(ghostImage);
ghost.scale = 0.40;

doorGroup = new Group();
climberGroup = new Group();
invisibleBlockGroup = new Group();
gameState = "play";
}
function draw(){
  background("black");
  if(gameState==="play"){
  if(tower.y>400){
    tower.y = 300;
  }
  
  if(keyDown("Left_Arrow")){
   ghost.x = ghost.x-3;
  }
  if(keyDown("Left_Arrow")){
   ghost.x = ghost.x+3;
  }
  if(keyDown("Space")){
   ghost.velocityY = -5; 
  }
  ghost.velocityY = ghost.velocityY;
  
  spawnDoors();
  
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
 ghost.destroy();
 gameState = "End"; 
  }
  
if(climberGroup.isTouching(ghost)){
ghost.velocityY = 0;  
}  
  
  drawSprites();
  }
  if(gameState==="End"){
   stroke("yellow");
   fill("yellow");
   textSize(30);
   text("Game Over",230,250);
  }
}
function spawnDoors(){
if (frameCount%240===0){
door = createSprite(200,-50);
door.addImage(doorImage);
climber = createSprite(200,10);
climber.addImage(climberImage);
invisibleBlock = createSprite(200,15)
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
door.x = Math.round(random(120,400));
climber.x = door.x;
invisibleBlock.x = door.x;
door.velocityY = 1;
climber.velocityY = 1;
invisibleBlock.velocityY = 1
ghost.depth = door.depth;
ghost.depth+=1;
climber.lifetime = 800;
door.lifetime = 800;
invisibleBlock.lifetime = 800;
doorGroup.add(door);
climberGroup.add(climber);
invisibleBlockGroup.add(invisibleBlock);
   
}
}