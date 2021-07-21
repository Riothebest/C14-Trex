var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg;

var cloudGrp;

var obstacle;
var obstacle1, obstacle2, obstacle3, obstacle4;
var obstacle5, obstacle6

var obstacleGroup;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 cloudImg = loadImage("cloud.png");

 obstacle1 = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.png");
 obstacle4 = loadImage("obstacle4.png");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {

  createCanvas(600,200)
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  //console.log(rand)

  obstacleGroup = new Group();

  cloudGrp = new Group();

}

function draw() {
  //set background color
  background(180);

  //score
  text("Score: "+score,500,40);

  if(gameState === PLAY)
  {
    //ground movemeb=nt
    ground.velocityX = -8;

     //score logic
    score += Math.round(frameCount/60);

    // jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 140) 
    {
      trex.velocityY = -10;
    }

    //gravity
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }

    
    //Spawn Clouds
    spawnClouds();
    //onsole.log(frameCount);
    spawnObstacle();

    if(obstacleGroup.isTouching(trex))
    {
      gameState = END;
    }
  }

  else if(gameState === END)
  {
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGrp.setVelocityXEach(0);
  }

   //stop trex from falling down
   trex.collide(invisibleGround);

 
  
  //console.log(trex.y)
  

  
  
  
  
  
  
 
  
  
  drawSprites();

}

//function to spawn the clouds
function spawnClouds(){
 // write your code here
 if(frameCount%60 == 0)
 {
    cloud = createSprite(610,Math.round(random(20,120)),10,10);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5
    cloud.velocityX = -4;
    cloud.lifetime = 160;
    cloudGrp.add(cloud);
    /*console.log('trex Depth',trex.depth)
    console.log('cloud Depth',cloud.depth)*/
    trex.depth = cloud.depth + 1
 }
}

function spawnObstacle()
{
  if(frameCount%70 == 0)
  {
    obstacle = createSprite(610,165,10,10);
    obstacle.velocityX = -4;
    obstacle.lifetime = 160;
    var a = Math.round(random(1,6));
    switch(a)

    {
      case 1: obstacle.addImage(obstacle1);
              break;

      case 2: obstacle.addImage(obstacle2);
              break;

      case 3: obstacle.addImage(obstacle3);
              break;

      case 4: obstacle.addImage(obstacle4);
              break;

      case 5: obstacle.addImage(obstacle5);
              break;

      case 6: obstacle.addImage(obstacle6);
              break;

      default: break;
    }
    obstacle.scale = 0.5;
    obstacleGroup.add(obstacle);
  }
}

