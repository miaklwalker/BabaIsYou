import Block from "../Block.js";
import chooseShape from "../../helperFunctions/chooseShape.js";

export default class Wall extends Block{
    texture;
    constructor(x,y,tint) {
        super(x,y,'WALL','WALL');
        this.strategy = 'WALL';
        this.tint = tint;

    }
    draw(others){
        this.chooseName(others);
        return [...super.draw(),this.name,this.texture,this.type]
    }
    chooseName(neighbors){
        this.updateAndFindNeighbors(neighbors);
        let {left,down,right,up} = this.neighbors;
        this.name = chooseShape([left,down,right,up]);
    }
}