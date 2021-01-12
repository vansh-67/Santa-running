var bg,bg_img;
var santa,santa_ani,santa_img;
var bSanta,bSanta_ani;
var gift,gift_img1,gift_img2,gift_img3;
var gift_group;
var snow,snow_img;
var enemy,enemy_img,enemy_group;
var attack,attack_img,attack_group;
var inGround;
var giftS = 0;
var hitS = 0;

var gameOver,gameOver_img;
var restart,restart_img;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
 bg_img = loadImage("bg.webp");
 gift_img1 = loadImage("gift/gift1.png");
 gift_img2 = loadImage("gift/gift2.png");
 gift_img3 = loadImage("gift/gift3.png");
 snow_img = loadImage("snow.png");
 enemy_img = loadImage("snowman.png");
 attack_img = loadImage("attack.png");
 gameOver_img = loadImage("gameover.png");
 restart_img = loadImage("restart.png");
 santa_img = loadImage("santa/sSanta.png");
 santa_ani = loadAnimation("santa/santa1.png","santa/santa2.png","santa/santa3.png","santa/santa4.png","santa/santa5.png","santa/santa6.png","santa/santa7.png","santa/santa8.png","santa/santa9.png","santa/santa10.png");
 bSanta_ani = loadAnimation("bsanta/santa1.png","bsanta/santa2.png","bsanta/santa3.png","bsanta/santa4.png","bsanta/santa5.png","bsanta/santa6.png","bsanta/santa7.png","bsanta/santa8.png","bsanta/santa9.png","bsanta/santa10.png");
}

function setup() {
 createCanvas(600,250);
  
  bg = createSprite(350,100);
  bg.addImage("bg",bg_img);
  bg.scale = 1.5;
  
  inGround = createSprite(300,230,600,10);
  inGround.visible = false;
  
  santa = createSprite(220,200,10,10);
  santa.scale = 1.7;
  santa.addAnimation("santa",santa_ani);
  santa.addImage("santa2",santa_img);
  santa.setCollider("rectangle",0,0,30,50);
  
  bSanta = createSprite(50,200,10,10);
  bSanta.addAnimation("bSanta",bSanta_ani);
  bSanta.scale = 1.7;
  
  restart = createSprite(305,200,100,100);
  restart.addImage("restart",restart_img);
  restart.scale = 0.25;
  
  gameOver = createSprite(300,120,10,10);
  gameOver.addImage("gameOver",gameOver_img);
  gameOver.scale = 0.3;
  
  enemy_group = new Group();
  attack_group = new Group();
  gift_group = new Group();
}

function draw() {
 background("white");
  
for(var i = 0 ; i < gift_group.length ; i++){
  if(gift_group[i].isTouching(santa)){
    gift_group[i].destroy();
    giftS = giftS+1;
  }
}
  
for(var d = 0 ; d < enemy_group.length ; d++){
  if(enemy_group[d].isTouching(santa)){
    enemy_group[d].destroy();
    giftS = giftS-2;
  }
}
  
for(var e = 0 ; e < attack_group.length ; e++){
  if(attack_group[e].isTouching(santa)){
    attack_group[e].destroy();
    hitS = hitS+1;
  }
}
  
  if(gameState === PLAY){
  restart.visible = false;
  gameOver.visible = false;
  bSanta.visible = true;
    
  bg.velocityX = -2;
    
  santa.velocityY = santa.velocityY+0.25;
  
  if(keyDown("space") && santa.y > 50){
    santa.velocityY = -3;
  }
  
  if(bg.x < 250){
    bg.x = 350;
  }
  
  drawAttack();
  drawEnemy();
  drawGifts();
}
  
  if(hitS === 5){
    gameState = END;
  }
  
  if(gameState === END){
    
  santa.changeImage("santa2",santa_img);
  santa.x = 300;
  santa.y = 50;
    
  if(mousePressedOver(restart)){
    reset();
  }
    
   bg.velocityX = 0;
    
   restart.visible = true;
   gameOver.visible = true;
    
   santa.velocityY = 0;
    
   bSanta.visible = false;
   gift_group.destroyEach();
   attack_group.destroyEach();
   enemy_group.destroyEach();
  }
  
  santa.collide(inGround);
  
  bSanta.y = santa.y;
  
  drawSnow();
  drawSprites();
  
  fill("white");
  textSize(20);
  text("gifts:"+giftS,500,30);
  
  fill("white");
  textSize(20);
  text("Hits:"+hitS,50,30);
}

function drawGifts(){
 if(frameCount%Math.round(random(100,160)) === 0){
  gift = createSprite(605,195,10,10);
  gift.velocityX = -3;
  gift.scale = 0.8;
  gift.lifetime = 205;
  gift_group.add(gift);
  
  var rand = Math.round(random(1,3));
  
if(rand === 1){
  gift.addImage("gift1",gift_img1);
 }
else if(rand === 2){
  gift.addImage("gift2",gift_img2);
 }
else if(rand === 3){
  gift.addImage("gift3",gift_img3);
  }
 }
}

function drawSnow(){
 if(frameCount%20 === 0){
  snow = createSprite(-5,2,10,10);
  snow.x = Math.round(random(0,700));
  snow.addImage("snow",snow_img);
  snow.scale = 0.2;
  snow.velocityY = 2;
  snow.velocityX = -5;
  snow.lifetime = 105;
 }
}

function drawEnemy(){
 if(frameCount%Math.round(random(150,170)) === 0){
   enemy = createSprite(610,180,10,10);
   enemy.addImage("enemy",enemy_img);
   enemy.velocityX = -3;
   enemy.scale = 2;
   enemy.lifetime = 205;
   enemy.setCollider("rectangle",0,0,20,30);
   enemy_group.add(enemy);
 }
}

function drawAttack(){
 if(frameCount%Math.round(random(150,180)) === 0){
   attack = createSprite(50,10,10,10);
   attack.addImage("attack",attack_img);
   attack.y = bSanta.y;
   attack.velocityX = 2;
   attack.scale = 2;
   attack.lifetime = 305;
   attack.setCollider("circle",0,-5,10);
   attack_group.add(attack);
 }
}

function reset(){
  gameState = PLAY;
  santa.changeAnimation("santa",santa_ani);
  santa.x = 220;
  santa.y = 200;
  hitS = 0;
  giftS = 0;
}