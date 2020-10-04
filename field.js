class Field{
  constructor(bomb,x,y,size){
    this.bomb = bomb;
    this.visible = false;
    this.flag = false;
    this.x = x;
    this.y = y;
    this.size = size;
    this.num = 0;
    textSize(this.size)
  }
  
  display(){
    if(!this.visible){
      fill(255)
      rect(this.x,this.y,this.size,this.size)
      if(this.flag){
        fill(255,0,0)
        ellipse(this.x+this.size/2,this.y+this.size/2,this.size/3)
      }
    }
    else{
      fill(255)
      if(this.num != 0){
        text(this.num,this.x+this.size/5,this.y+this.size-this.size/10)
      }
    }
  }
  
  clicked(){

  }
  
  getBomb(){
    return this.bomb
  }
  setBomb(bomb){
    this.bomb = bomb
  }
  isVisible(){
    return this.visible
  }
  setVisible(visible){
    if(!this.bomb){
      this.visible = visible
    }
  }
  setNum(num){
    this.num = num;
  }
  getNum(){
    return this.num
  }
  changeFlag(){
    this.flag = !this.flag
  }
  getFlag(){
    return this.flag
  }
}