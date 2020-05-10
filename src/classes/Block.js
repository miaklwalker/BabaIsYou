import Vector from "./Vector.js";


export default class Block {
    constructor(x,y){
        this.position = new Vector(x,y);
        this.traits = []
    }
    draw(){
        return [this.position.x,this.position.y]
    }
    onMessage(message){
        this.traits.forEach(trait=>{
            trait.update(this,message);
        })
    }
}

