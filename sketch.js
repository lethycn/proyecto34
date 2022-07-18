
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var pista,pistaImg;
var poli,poliImg;
var pistola,ladron;
var pistolaImg,ladronImg;
var obs1,obs2;
var obs1Img,obs2Img;
var pistolaG,ladronG,obs1Group,obs2Group;
var treasureCollection = 0;
var end,endImg;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload (){
  pista=loadImage("pista.png");
  poli=loadImage("poli.png");
  pistola=loadImage("pistola.png");
  ladron=loadImage("ladron.png");
  obs1=loadImage("carro.png");
  obs2=loadImage("abuelita.png");
  endImg=loadImage("end.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
    pista=createSprite(width/2,200);
    pista.addImage(pistaImg);
    pista.velocityY = 4;

    poli = createSprite(width/2,height-20,20,20);
    poli.velocityY = 2;
    poli.velocityX = 3;
    poli.scale=0.08;
    poli.addImage(poliImg);

pistolaG=new Group();
ladronG=new Group();
obs1Group=new Group();
obs2Group=new Group();

  engine = Engine.create();
  world = engine.world;
  
}


function draw() 
{
  if(gameState===PLAY){
  background(0);
  poli.x = World.mouseX;
  poli.x = World.mouseY;

  edges= createEdgeSprites();
  poli.collide(edges);

  if(pista.x > height ){
    pista.x = height/2;
   }

   createPistola();
   createLadron();
   createObs1();
   createObs2();

   if (pistolaG.isTouching(poli)) {
    pistolaG.destroyEach();
    treasureCollection=treasureCollection + 50;
  }
  else if (ladronG.isTouching(poli)) {
    ladronG.destroyEach();
    treasureCollection=treasureCollection + 100;
    
  }else if(obs1Group.isTouching(poli)) {
    gameState=END;
        
       poli.addAnimation(endImg);
       poli.x=width/2;
       poli.y=height/2;
       poli.scale=0.6;
        
        pistolaG.destroyEach();
        ladronG.destroyEach();
        obs1Group.destroyEach();
        obs2Group.destroyEach();
        
        pistolaG.setVelocityYEach(0);
        ladronG.setVelocityYEach(0);
        obs1Group.setVelocityYEach(0);
        obs2Group.setVelocityYEach(0);
  }else{
    if(obs2Group.isTouching(poli)) {
      gameState=END;
      
     poli.addAnimation(endImg);
     poli.x=width/2;
     poli.y=height/2;
     poli.scale=0.6;
      
     pistolaG.destroyEach();
     ladronG.destroyEach();
     obs1Group.destroyEach();
     obs2Group.destroyEach();
     
     pistolaG.setVelocityYEach(0);
     ladronG.setVelocityYEach(0);
     obs1Group.setVelocityYEach(0);
     obs2Group.setVelocityYEach(0);
    
    }
  }


  Engine.update(engine);
  drawSpites();
  textSize(20);
  fill(255);
  text("puntuacion: "+ treasureCollection,width-150,30);

}
}

function createPistola() {
  if (World.frameCount % 200 == 0) {
  var pistola= createSprite(Math.round(random(50, width-50),40, 10, 10));
  pistola.addImage(pistolaImg);
  pistola.scale=0.12;
  pistola.velocityY = 5;
  pistola.lifetime = 200;
  pistolaG.add(pistola);
  }
}
function createLadron() {
  if (World.frameCount % 200 == 0) {
  var ladron = createSprite(Math.round(random(50, width-50),40, 10, 10));
  ladron.addImage(ladronImg);
  ladron.scale=0.12;
  ladron.velocityY = 5;
  ladron.lifetime = 200;
  ladronG.add(ladron);
  }
}
function createObs1(){
  if (World.frameCount % 530 == 0) {
  var obs1 = createSprite(Math.round(random(50, width-50),40, 10, 10));
  obs1 .addImage(carroImg);
  obs1 .scale=0.1;
  obs1 .velocityY = 4;
  obs1 .lifetime = 200;
  obs1Group.add(obs1);
  }
}
function createObs2(){
  if (World.frameCount % 530 == 0) {
  var obs2= createSprite(Math.round(random(50, width-50),40, 10, 10));
  obs2.addImage(obs2Img);
  obs2.scale=0.1;
  obs2.velocityY = 4;
  obs2.lifetime = 200;
  obs2Group.add(obs2);
  }
}
