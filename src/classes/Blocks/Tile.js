import Block from "../Block.js";


export default class Tile extends Block{
    constructor(x,y,name) {
        super(x,y,name,'tiles');
        this.strategy = 'TILE';
    }
    draw(){
        return [...super.draw(),this.name,undefined,this.type,this.id]
    }
}