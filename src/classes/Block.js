import Vector from "./Vector.js";


export default class Block {
    constructor(x,y){
        this.position = new Vector(x,y);
    }
    draw(){
        return [this.position.x,this.position.y]
    }
}

