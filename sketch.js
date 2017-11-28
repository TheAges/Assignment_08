var backColor = ["#82d14f","#ff9f4c","#6b7cff","#ff5151","#bd4cff"],
    backColorStill,
    buttonSTART,
    buttonINSTR, //INSTRUCTIONS
    buttonCREDITS,

    img_back,
    indexInstr=1,

    textSize_button,
    wheight_button,

    posX_buttonSTART,
    posY_buttonSTART,
    width_buttonSTART,
    height_buttonSTART,

    posX_buttonINSTR,
    posY_buttonINSTR,
    width_buttonINSTR,
    height_buttonINSTR,

    posX_buttonBACK,
    posY_buttonBACK,
    diameter_buttonBACK,

    modeMENU = true,
    modeINSTR = false,
    modeGAME = false,

    score = 0,
    verso = 0,
    firstRot=true,
    gameOver=false,
    t = 0;
    t1 = 0;

function preload() {
  img_back = loadImage("assets/back.png");
  img_main = loadImage("assets/main.png");
  img_flip = loadImage("assets/flip.png");
  img_right = loadImage("assets/right.png");
  img_left = loadImage("assets/left.png");
  img_instr1 = loadImage("assets/instr1.png");
  img_instr2 = loadImage("assets/instr2.png");
  img_instr3 = loadImage("assets/instr3.png");
  lobster = loadFont('assets/Lobster_1.3.otf');
  //arial = loadFont('assets/arial.ttf');

}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);

  textSize_button = height*0.055,
  wheight_button = 3,

  posX_buttonSTART = (width/2),
  posY_buttonSTART = (4.2*height/6),
  width_buttonSTART = (width*0.31),
  height_buttonSTART = (height*0.07),

  posX_buttonINSTR = (width/2),
  posY_buttonINSTR = (posY_buttonSTART+height/8.5),
  width_buttonINSTR = width*0.61,
  height_buttonINSTR = height*0.07,

  posX_buttonBACK = width*0.90,
  posY_buttonBACK = height*0.055,
  diameter_buttonBACK = height*0.05;

  posY_buttonARROW = height*0.75;
  posX_buttonLEFT = -200;
  posX_buttonRIGHT = width*0.5;
  diameter_buttonARROW = height*0.115;
}

function setup() {
  createCanvas(innerWidth,innerHeight);
  noFill();
  noStroke();
  angleMode(DEGREES)
  textFont(lobster);

  backColorStill=random(backColor);
  background(backColorStill);

  textSize_button = height*0.055,
  wheight_button = 3,

  posX_buttonSTART = (width/2),
  posY_buttonSTART = (4.2*height/6),
  width_buttonSTART = (width*0.31),
  height_buttonSTART = (height*0.07),

  posX_buttonINSTR = (width/2),
  posY_buttonINSTR = (posY_buttonSTART+height/8.5),
  width_buttonINSTR = width*0.61,
  height_buttonINSTR = height*0.07,

  posX_buttonBACK = width*0.90,
  posY_buttonBACK = height*0.055,
  diameter_buttonBACK = height*0.05;

  posY_buttonARROW = height*0.75;
  posX_buttonLEFT = -200;
  posX_buttonRIGHT = width*0.5;
  diameter_buttonARROW = height*0.115;

}

function draw() {
  if (innerWidth>innerHeight) {turnScreen()}
  else {
      if (modeMENU==true) {menu();};
      if (modeGAME==true) {game();};
  }

  if (modeINSTR==true) {instructions()};

push()
  if ((width==500)&&(height==500)) {
    fill("white")
    background(backColorStill);
    textSize(40);
    text("Please, play this sketch, only on a mobile device",width/2,height/2,width,height*0.7)
  }
pop()
}

function touchEnded() {

  if ((modeMENU==true)&&(mouseX>(posX_buttonSTART-(width_buttonSTART/2)))&&(mouseX<(posX_buttonSTART+(width_buttonSTART/2)))&&(mouseY>((posY_buttonSTART)-(height_buttonSTART/2)))&&(mouseY<((posY_buttonSTART)+(height_buttonSTART/2))))
    {modeGAME=true; modeMENU=false; modeINSTR=false; console.log("GAME="+modeGAME)};
  if ((modeMENU==true)&&(mouseX>(posX_buttonINSTR-(width_buttonINSTR/2)))&&(mouseX<(posX_buttonINSTR+(width_buttonINSTR/2)))&&(mouseY>((posY_buttonINSTR)-(height_buttonINSTR/2)))&&(mouseY<((posY_buttonINSTR)+(height_buttonINSTR/2))))
    {modeGAME=false; modeMENU=false; modeINSTR=true; console.log("INSTR="+modeINSTR); indexInstr=1; posX_buttonLEFT = -200; posX_buttonRIGHT = width*0.5;};
  if ((modeMENU==false)&&(dist(mouseX,mouseY,posX_buttonBACK,posY_buttonBACK)<(diameter_buttonBACK/2)))
  {modeGAME=false; modeMENU=true; modeINSTR=false; console.log("MENU="+modeMENU); t = 0; t1 = 0; score = 0; gameOver=false; verso=0; firstRot=true};

  if ((modeINSTR==true)&&(dist(mouseX,mouseY,posX_buttonRIGHT,posY_buttonARROW)<(diameter_buttonARROW/2)))
  {indexInstr++; if (indexInstr>3) {indexInstr=1}};

  if ((modeINSTR==true)&&(dist(mouseX,mouseY,posX_buttonLEFT,posY_buttonARROW)<(diameter_buttonARROW/2)))
  {indexInstr--; if (indexInstr<1) {indexInstr=3}};

}

function menu() {
  background(backColorStill);
  buttonSTART()
  buttonINSTRUCTIONS()

  imageMode(CENTER)
  image(img_main, width/2, height*0.375,width*0.8,width*0.8)
};


function game() {
  t1++

  fill("white")
  noStroke()

  background(backColorStill);
  buttonBACK()

  textFont(lobster)
  textSize(height*0.08)

  if (firstRot==true) {
    if((t1>15)&&(t==0)) {text("Ready",width/2,height*0.3)}
    if((t1>55)&&(t==0)) {text("Set",width/2,height*0.4)}

  textSize(height*0.15)
    if((t1>100)&&(t==0)) {text("Flip!",width/2,height*0.525)}
  }

  if (gameOver==true) {
    textSize(height*0.08)
    text("Well done!",width/2,height*0.3);
    text("your score is ",width/2,height*0.4);
    textSize(height*0.2)
    text(score,width/2,height*0.6)
    textSize(height*0.08)
    if (score>=1.5) {text("flips",width/2,height*0.775)} else {text("flip",width/2,height*0.775)}
    if (score==0) {
      background(backColorStill);
      buttonBACK()
      textSize(height*0.06)
      text("Oh no, something went wrong",width/2,height*0.35,width*0.75,height);
      textSize(height*0.045)
      text("...or you are mediocre in this game",width/2,height*0.6,width*0.75,height);
    }
  }

  /*text(score,width/2,height/2)
  text(t,width/2,height*0.75)*/

  if (firstRot==true) {
  if ((pRotationX-rotationX)>179) {verso=1;firstRot=false;}
  //if ((rotationX-pRotationX)>179) {verso=2;firstRot=false;}
  }

  if (verso==1 && gameOver==false) {
      t++ //attiva tempo

      //aumenta il punteggio
      if ((Math.round(pRotationX)-Math.round(rotationX))>180) {score+=0.5; t = 0} //quando è oltre 180
      if (((Math.round(pRotationX)-Math.round(rotationX))<180)&&(pRotationX<0)&&(rotationX>0)) {score+=0.5; t = 0} //quando torna in positivo

      //toggli il punteggio quando gira nel senso inverso.
      if ((Math.round(rotationX)-Math.round(pRotationX))>180) {score-=0.5; t = 0}
      if (((Math.round(pRotationX)-Math.round(rotationX))<180)&&(pRotationX>0)&&(rotationX<0)) {score-=0.5; t = 0}

     }

  if ((t/60) > 0.5) {gameOver=true}
  if (gameOver==true) {}

};

function instructions() {
  fill("white")
  noStroke()

  background(backColorStill);
  buttonBACK()

  image(img_left,posX_buttonLEFT,posY_buttonARROW,diameter_buttonARROW,diameter_buttonARROW);
  image(img_right,posX_buttonRIGHT,posY_buttonARROW,diameter_buttonARROW,diameter_buttonARROW);

  if (indexInstr==1) {posX_buttonLEFT=-200; posX_buttonRIGHT=width/2};
  if (indexInstr==2) {posX_buttonLEFT=width*0.25; posX_buttonRIGHT=width*0.75};
  if (indexInstr==3) {posX_buttonLEFT=width/2; posX_buttonRIGHT=-200};

  push()
    textSize(height/28)
    textFont()
    textAlign(CENTER,CENTER)

    if (indexInstr==1) {
      image(img_instr1, width/2, height*0.35,width*0.5,width*0.5)
      text("hold your phone like in the picture above",width/2, height*0.575,width*0.60,width*0.5)
    }
    if (indexInstr==2) {
      image(img_instr2, width/2, height*0.275,width*0.8,width*0.8)
      text("Toss your phone and try to do the most flip you can!",width/2, height*0.575,width*0.60,width*0.5)
    }
    if (indexInstr==3) {
      image(img_instr3, width/2, height*0.35,width*0.8,width*0.8);
      text("if possible try to catch your phone before it smash to the floor", width/2, height*0.575,width*0.60,width*0.5);
      textFont("arial");
      textLeading(15)
      fill(255,170)
      text("the creator of this app do not take any responsibility for damage to persons, animals or any item of property caused by the use of this app", width/2, height*0.925,width*0.80,width*0.2);
    }
  pop()

};

function buttonSTART() {
  if ((mouseX>(posX_buttonSTART-(width_buttonSTART/2)))&&(mouseX<(posX_buttonSTART+(width_buttonSTART/2)))&&(mouseY>((posY_buttonSTART)-(height_buttonSTART/2)))&&(mouseY<((posY_buttonSTART)+(height_buttonSTART/2))))

  rectMode(CENTER)
  textAlign(CENTER,CENTER)
  textSize(textSize_button)

  fill("white")
  stroke("white")
  strokeWeight(wheight_button)
  rect(posX_buttonSTART,posY_buttonSTART,width_buttonSTART,height_buttonSTART,30)

  fill(backColorStill)
  noStroke()
  text("Start",posX_buttonSTART,posY_buttonSTART)
  textStyle(BOLD)
};

function buttonINSTRUCTIONS() {

  rectMode(CENTER)
  textAlign(CENTER,CENTER)
  textSize(textSize_button)


  fill("white")
  stroke("white")
  strokeWeight(wheight_button)
  rect(posX_buttonINSTR,posY_buttonINSTR,width_buttonINSTR,height_buttonINSTR,30)

  fill(backColorStill)
  noStroke()
  text("Instructions",posX_buttonINSTR,posY_buttonINSTR)
  textStyle(BOLD)

};

function buttonBACK() {
  imageMode(CENTER)
  image(img_back, posX_buttonBACK, posY_buttonBACK,diameter_buttonBACK,diameter_buttonBACK)
}

function turnScreen() {
  imageMode(CENTER);
  background(backColorStill)
  image(img_flip,width/2,height/2)
};
