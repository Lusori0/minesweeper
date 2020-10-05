let playfield = []
pfWidth = 25
pfHeight = 15

space = 1
fieldWidth = 39
fieldHeight = 39

let callstack = []
firstClick = false

document.oncontextmenu = function(){
  return false
}

function setup() {

  createCanvas(pfWidth*(fieldWidth+space), pfHeight*(fieldHeight+space));
  for (let x = 0; x < pfWidth;x++){
    playfield[x] = []
    for (let y = 0; y < pfHeight;y++){
      let bomb = false
      if (random()>0.84) bomb = true;
      playfield[x][y] = new Field(bomb,x*(fieldWidth+space),y*(fieldHeight+space),fieldWidth)
    }
  }

}

function draw() {
  background(0);
  
  for(let x = 0; x < playfield.length;x++){
    for(let y = 0; y < playfield[0].length;y++){
      playfield[x][y].display()
    }
  }
}

function getNumberOfBombs(xPos,yPos){
  number = 0;
  for(x = xPos-1; x <= xPos+1;x++){
    for(y = yPos-1; y <= yPos+1;y++){
      if(x != xPos || y != yPos){
        if(x >= 0 && x < pfWidth && y >= 0 && y < pfHeight){
          if(playfield[x][y].getBomb()){
            number++;
          }
        }
      }
    }
  }
  return number
}

function mousePressed(){
  if(mouseX >= 0 && mouseX <= pfWidth*(fieldWidth+space)){
    if(mouseY >= 0 && mouseY <= pfHeight*(fieldHeight+space)){
      let x = Math.floor(mouseX/(fieldWidth+space));
      let y = Math.floor(mouseY/(fieldHeight+space));

      if(mouseButton === LEFT){
        if(!firstClick){
          firstClick = true
          deleteBombs(x,y);
          calcNumbers();
        }
        if(!playfield[x][y].isVisible()){
          playfield[x][y].setVisible(true)
          openField(x,y);
          callstack = []
        }

      }
      else if(mouseButton === RIGHT){
        playfield[x][y].changeFlag();
      }

    }
  }

}

function openField(xPos,yPos){
  callstack.push(xPos.toString()+yPos.toString())
  playfield[xPos][yPos].setVisible(true)

  if(playfield[xPos][yPos].getNum() == 0){
    for(let x = xPos-1; x <= xPos+1;x++){
      for(let y = yPos-1;y<=yPos+1;y++){
        if(x != xPos || y != yPos){
          if(x >= 0 && x < pfWidth && y >= 0 && y < pfHeight){
            playfield[x][y].setVisible(true);
            if(playfield[x][y].getNum() == 0){
              if(!callstack.includes(x.toString()+y.toString())){
                callstack.push(xPos.toString()+yPos.toString())
                openField(x,y)
              }
            }
          }
        }
      }
    }
  }
}

function deleteBombs(xPos,yPos){
    for(let x = xPos-1; x <= xPos+1;x++){
      for(let y = yPos-1;y<=yPos+1;y++){
        if(x >= 0 && x < pfWidth && y >= 0 && y < pfHeight){
          playfield[x][y].setBomb(false)
        }
      }
    }
  }


function calcNumbers(){
  for(let x = 0; x < pfWidth;x++){
    for(let y = 0;y < pfHeight;y++){
      if(!playfield[x][y].getBomb()){
        playfield[x][y].setNum(getNumberOfBombs(x,y));
      }
      else{
        playfield[x][y].setNum(-1)
      }
    }
  }
}