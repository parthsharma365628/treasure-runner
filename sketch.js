var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gover1;
var state="play"
var restart,restart1; 

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  end =loadImage("gameOver.png");
  restart1=loadImage("re.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height/2);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,530,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
    
  

  cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

gover1=createSprite(width/2,height/2,10,10);
gover1.addImage(end);
gover1.visible=false;
  
restart=createSprite(width/2,height-100,10,10) ;
restart.addImage(restart1) ;
restart.scale=0.15;
restart.visible=false;
}

function draw() {

 background("#4c4d4f");
 if(state==="play"){
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+10
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
       treasureCollection=treasureCollection+10
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
       treasureCollection=treasureCollection+10
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        state="over"
        // gover()
      
      }
    
    
    }
  }

  else if (state==="over"){
    gover1.visible=true
  boy.visible=false;
  cashG.destroyEach();
  diamondsG.destroyEach();
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
  path.visible=false;
  state="over";
  
  restart.visible=true;

  if(mousePressedOver(restart)){
  reset()
  }
    
  }
  
  drawSprites();
  textSize(25);
  fill("red");
  text("Treasure: "+ treasureCollection,20,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 250;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 250;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,width-50),40,10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 250;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 300 == 0) {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
    if(gover1.visible===true){
      sword.velocityY=-20
    }
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 250;
  swordGroup.add(sword);
  }
}



function reset(){
  state="play"
  gover1.visible=false
  restart.visible=false
  path.visible=true
  boy.visible=true
  treasureCollection=0

}
