var axe, plantsGroup, edges, babyPlant, tree, bgImg, girl, axeImg, babyPlantImg, treeImg, girlImg, grownTree, PlantScore, AxeScore,board, gameEndSound,WaterSound,cutting
var gameState = "serve"

function preload() {
  axeImg = loadImage("axe.png");
  babyPlantImg = loadImage("babyplant.png");
  treeImg = loadImage("tree.png");
  bgImg = loadImage("lawn.jpg");
  girlImg = loadImage("wateringPlants.png");
  board = loadImage("blackboard.jpg");
  WaterSound=loadSound("Water.mp3");
  gameEndSound=loadSound("Game end.mp3");
  cutting=loadSound("cutting.mp3");
}

function setup() {
  createCanvas(600, 600)
  axe = createSprite(100, 200, 20, 20)
  axe.addImage("axeImg", axeImg)
  axe.scale = 0.15;
      axe.velocityX = 10;
  axe.velocityY = 12;
  girl = createSprite(300, 500, 20, 20);
  girl.addImage("girlImg", girlImg)
  girl.scale = 0.3;
  plantsGroup = new Group()
  edges = createEdgeSprites()
  girl.setCollider("rectangle", -20, -20, 350, 100)
  //girl.debug=true;
  AxeScore = 0;
  PlantScore = 0;
}

function draw() {
  background(bgImg)

  fill("black");
  textSize(20);
  textFont("Elephant")
  text("Score Of Axe :" + AxeScore, 50, 50);
  text("Score Of Player :" + PlantScore, 50, 100);
  axe.bounceOff(edges[0]);
  axe.bounceOff(edges[1]);
  axe.bounceOff(edges[2]);
  axe.bounceOff(edges[3]);


  if (gameState === "serve") {
    background(board)
    fill("white")
    textSize(12)
    text("Rules",200,200)
    text("1) If Axe touches a baby plant,it will die and score for axe will increase",40,220)
    text("2) The girl is the player.",40,240)
    text("3)If the water pot of the girl touches the plant,then a grown ",40,260)
    text("up tree will be formed at a different location and score for player will increase",40,277)
    text("4)The axe cannot destroy a grown up tree",40,297);
    text("5)The grown up tree will vanish automatically after sometime",40,317)
        text("6)The plant which is not watered will also vanish automatically after sometime",40,337)
        text("7)The vanishing of grown tree will not affect the score",40,357)
        text("8)Whoever scores 50 points,will win",40,377)
    if (keyDown("space")) {
      gameState = "play";
    }
    axe.visible=false;
     girl.visible=false;
  } else if (gameState === "play") {
     axe.visible=true;
     girl.visible=true;
      growPlants();

    
    if (keyDown(UP_ARROW)) {
      girl.y = girl.y - 10
    }
    if (keyDown(DOWN_ARROW)) {
      girl.y = girl.y + 10
    }
    if (keyDown(LEFT_ARROW)) {
      girl.x = girl.x - 10
    }
    if (keyDown(RIGHT_ARROW)) {
      girl.x = girl.x + 10
    }
    if (girl.isTouching(plantsGroup)) {
        WaterSound.play();
      grownTree = createSprite(random(10, 550), random(400, 580), 10, 10)
      grownTree.addImage("growntree", treeImg);
      grownTree.scale = 0.10;
      grownTree.lifetime = 180;
      PlantScore = PlantScore + 1
      plantsGroup[0].destroy();
    }
    if (axe.isTouching(plantsGroup)) {
      plantsGroup[0].destroy();
      AxeScore = AxeScore + 1;
      cutting.play();
    }
    if(AxeScore===50||PlantScore===50){
      gameState="end";
        gameEndSound.play()
    }

  } else if (gameState === "end") {
  
 axe.visible=false;
    girl.visible=false;
    plantsGroup.setLifetimeEach(-1);
    if(AxeScore ===50&&AxeScore>PlantScore){
      textFont("Elephant")
      textSize(35)
      fill("red")
      text("Pollution is not under control",50,250)
    }
     else if(PlantScore ===50&&PlantScore>AxeScore){
      textFont("Elephant")
      textSize(35)
      fill("red")
      text("Pollution is  under control",50,250)
    }
  }

  drawSprites();

}

function growPlants() {
  if (frameCount % 80 === 0) {
    tree = createSprite(200, 200, 10, 10);
    tree.addImage("treeImg", babyPlantImg)
    plantsGroup.add(tree)
    tree.x = Math.round(random(10, 550))
    tree.y = Math.round(random(15, 350));
    tree.lifetime = 350;
    tree.scale = 0.04;
  }


}