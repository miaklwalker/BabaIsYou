import Vector from "./Vector.js";
import makeUniqueId from "../helperFunctions/MakeID.js";

export default class Block {
    constructor(x,y){
        this.position = new Vector(x,y);
    }
    draw(){
        return [this.position.x,this.position.y,this.name]
    }
}

export class NounBlock extends Block{
    constructor(x,y,name,type,id = makeUniqueId(12)) {
        super(x,y);
        this.name = name;
        this.type = 'noun';
        this.id = id;
    }
    draw(){
    return [...super.draw(),this.type,this.id]
    }
}