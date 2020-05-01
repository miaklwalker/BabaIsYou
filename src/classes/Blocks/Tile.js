import Block from "../Block.js";


export default class Tile extends Block{
    constructor(x,y,name) {
        super(x,y);
        this.type = 'tiles';
        this.name = name;
    }
    draw(){
        return [...super.draw(),this.name,undefined,this.type,this.id]
    }
}