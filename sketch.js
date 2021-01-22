var player, playerImg
var edges= []
var gMiddle
var coin
var obstacle
var rand
var score = 0
var gameState = "info"
var coinGroup
var obGroup
var coinImg
var bgImg
var comet
var comGroup
var invPowerUp
var rand1
var invPowerGroup
var fcount
var playButton
var playImg
var cometImg
var invpotionImg
var trackImg
var count
var bg
var titleImg
var title
var boss
var rand3
var astroid
var bullet
var shootButton
var health = 5;
var astroidGroup, bulletGroup
function preload(){
playerImg = loadImage("images/creature.png")
coinImg = loadImage("images/coin.png")
bgImg = loadImage("images/bg.jpg")
playImg = loadImage("images/playy.png")
cometImg = loadImage("images/COMET.png")
invpotionImg = loadImage("images/invpotion.png")
trackImg = loadImage("images/track.png.png")
titleImg = loadImage("images/title.png")
}

function setup() {
  createCanvas(800,600);
  bg = createSprite(400,200,20,20)
  bg.addImage(bgImg)
  bg.scale = 2
  bg.velocityX = -5;
  player = createSprite(100, 100, 50, 50);
  player.addImage(playerImg)
  player.scale = 0.1
  player.setCollider("circle",0,0,300)
  edges = createEdgeSprites()

  gTop = createSprite(400,180,800,10)
  gTop2 = createSprite(200,180,800,10)
  gTop3 = createSprite(600,180,800,10)
  gMiddle = createSprite(400,400,800,10)
  gMiddle2 = createSprite(200,400,800,10)
  gMiddle3 = createSprite(600,400,800,10)
  playButton = createSprite(420,550,20,20)
 
  gTop.addImage(trackImg)
  gTop.scale  = 0.1
  gTop2.addImage(trackImg)
  gTop2.scale  = 0.1
  gTop3.addImage(trackImg)
  gTop3.scale  = 0.1

  gMiddle.addImage(trackImg)
  gMiddle.scale  = 0.1
  gMiddle2.addImage(trackImg)
  gMiddle2.scale  = 0.1
  gMiddle3.addImage(trackImg)
  gMiddle3.scale  = 0.1
  
  title = createSprite(400,100)
  gTop2.setCollider("rectangle",0,0,gTop2.width,400)
  gMiddle2.setCollider("rectangle",0,0,gMiddle2.width,400)
  coinGroup = new Group()
  obGroup = new Group()
  comGroup = new Group();
  invPowerGroup = new Group();
  bulletGroup = new Group();
  astroidGroup = new Group();
  boss = createSprite(760, 400, 60,60)
  boss.shapeColor = "green"
  boss.visible = false;
  shootButton = createSprite(30,550,30,30)
  shootButton.shapeColor =  "white"
  shootButton.visible = false;
  bullet = createSprite()
  bullet.shapeColor = "purple"
  bullet.visible = false;
}

function draw() {
  background(0); 
 
  drawSprites();
if (gameState === "info") {
playButton.addImage(playImg)
playButton.scale = 0.3
bg.velocityX = 0;
title.addImage(titleImg)
title.scale = 0.5
textSize(35)
stroke("purple")
strokeWeight(4)
fill("white")
text("How to play:",500,200)
textSize(20)
text("To play, the objective is to stay",500,250)
text("alive for as long as possible",500,300)
text("and defeat the boss at the end!",500,350)
text("Your score is based on how many ",500,400)
text("stars you collect!",500,450)
if (mousePressedOver(playButton)) {
  gameState = "play"
  playButton.visible = false;
  bg.velocityX = -5;
  title.visible = false;
}
gMiddle.visible = false;
gTop.visible = false;
player.visible = false;
gTop2.visible = false;
gTop3.visible = false;
gMiddle2.visible = false;
gMiddle3.visible = false;


}

if (gameState === "play"||gameState === "invincible") {
  spawnCoins();
  spawnOb();
  spawnComet();
  spawnInvPowerUp();
  if (keyDown("space")&&(player.collide(gTop2)||player.collide(gMiddle2)||player.collide(edges[3]))) {
    player.velocityY = -12;
  }
  player.velocityY =  player.velocityY+0.8;

  if (keyDown(DOWN_ARROW)&&player.y < 400) {
    player.y = player.y+180;
  }

  if (keyDown(UP_ARROW)&&player.y > 160) {
    player.y = player.y-190;
  }

  if (invPowerGroup.isTouching(player)) {
    //change image
    gameState = "invincible"
    invPowerGroup.destroyEach();
 count = frameCount
  }
  if (count+100 === frameCount) {
    //change image
  gameState = "play"
  count = 0;
  }
  if (bg.x < 0) {
    bg.x = bg.width/2
  }
  if (player.collide(gMiddle)) {
    player.velocityY = 0;
  }
  gMiddle.visible = true;
gTop.visible = true;
player.visible = true;
playButton.visible = false;
gTop2.visible = true;
gTop3.visible = true;
gMiddle2.visible = true;
gMiddle3.visible = true;
title.visible = false;
for (var i =0; i < coinGroup.length; i++) {
  if (coinGroup.get(i)!= null&&coinGroup.get(i).isTouching(player)) {
  coinGroup.get(i).destroy();
  score++
  }
  }
  if ((obGroup.isTouching(player)||comGroup.isTouching(player))&&gameState != "invincible") {
    gameState = "end"
  }

  if (frameCount > 200) {
  gameState = "monster"
  }
 
} else if (gameState === "end") {
  bg.velocityX = 0;
coinGroup.setVelocityXEach(0)
obGroup.setVelocityXEach(0)
player.velocityY = 0;
coinGroup.setLifetimeEach(-1)
obGroup.setLifetimeEach(-1)
comGroup.setLifetimeEach(-1)
comGroup.setVelocityXEach(0)
} else if (gameState === "monster") {
  if (keyDown("space")&&(player.collide(gTop2)||player.collide(gMiddle2)||player.collide(edges[3]))) {
    player.velocityY = -12;
  }
  player.velocityY =  player.velocityY+0.8;

  if (keyDown(DOWN_ARROW)&&player.y < 400) {
    player.y = player.y+180;
  }

  if (keyDown(UP_ARROW)&&player.y > 160) {
    player.y = player.y-190;
  }

  if (bg.x < 0) {
    bg.x = bg.width/2
  }

  boss.visible = true;
  spawnAstroids()
  shootButton.visible = true;
if (bulletGroup.isTouching(boss)) {
  health = health-1
  bulletGroup.destroyEach();
}
if (astroidGroup.isTouching(player)) {
  gameState = "end"
}
if (astroidGroup.isTouching(bulletGroup)) {
  bulletGroup.destroyEach()
  astroidGroup.destroyEach();
}
  if (mousePressedOver(shootButton)) {
    spawnBullets();
  }

}
  player.collide(gTop)
  player.collide(gMiddle)
  player.collide(gTop2)
  player.collide(gTop3)
  player.collide(gMiddle2)
  player.collide(gMiddle3)
  player.collide(edges[3])
  player.collide(edges[2])
  if (gameState != "info") {
textSize(20)
fill("white")
text("Score: "+score,660,50)
  }

}

function spawnCoins() {
  rand = Math.round(random(1,3))
  if (frameCount % 80 == 0) {
coin = createSprite(820,300,10,10)
coin.addImage(coinImg)
coin.scale = 0.5
coin.velocityX = -7;
coin.lifetime = 164;
if (rand == 1) {
  coin.y = 575;
} else if (rand == 2) {
  coin.y = 370
} else if(rand == 3) {
  coin.y = 150;
}
coinGroup.add(coin)
  } 
}

function spawnOb() {
  rand = Math.round(random(1,3))
  if (frameCount % 63 == 0) {
    obstacle = createSprite(820,300,10,20)
    obstacle.velocityX = -7;
    obstacle.lifetime = 164;
    obstacle.shapeColor = "red"
    
    if (rand == 1) {
      obstacle.y = 575;
    } else if (rand == 2) {
      obstacle.y = 370
    } else if(rand == 3) {
      obstacle.y = 150;
    }
    obGroup.add(obstacle)
  }
}

function spawnComet() {
if (frameCount % 150 ===  0) {
comet = createSprite(800,random(0,600),20,20)
comet.addImage(cometImg)
comet.scale = 0.2
comet.lifetime = 300;
comet.shapeColor = "yellow"
comet.velocityX = random(-10,-5)
comet.velocityY = random(-10,10)
comet.pointTo(player)
comGroup.add(comet)
}
}

function spawnInvPowerUp() {
  rand1 = Math.round(random(1,3))
  if (frameCount % 250 === 0) {
  invPowerUp = createSprite(820,300,10,10)
  invPowerUp.addImage(invpotionImg)
  invPowerUp.scale = 0.1
    invPowerUp.lifetime = 164;
    invPowerUp.velocityX = -7;

    if (rand1 == 1) {
      invPowerUp.y = 575;
    } else if (rand1 == 2) {
      invPowerUp.y = 370
    } else if(rand == 3) {
      invPowerUp.y = 150;
    }
    invPowerGroup.add(invPowerUp)
  }
}

function spawnAstroids() {
  rand3 = Math.round(random(1,3))
  if (frameCount % 50 === 0){
    astroid = createSprite(820,300,10,20)
    astroid.velocityX = -7;
    astroid.lifetime = 164;
    astroid.shapeColor = "grey"
    
    if (rand3 == 1) {
      astroid.y = 575;
    } else if (rand3 == 2) {
      astroid.y = 370
    } else if(rand3 == 3) {
      astroid.y = 150;
    }
    astroidGroup.add(astroid)
}
}

function spawnBullets() {
  bullet.visible = true;
  bullet.x = player.x
  bullet.y = player.y
    bullet.velocityX = 7;
    bullet.lifetime = 164;
    bulletGroup.add(bullet)
    
}

