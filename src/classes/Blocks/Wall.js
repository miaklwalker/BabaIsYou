import Block from "../Block.js";
import chooseShape from "../../helperFunctions/chooseShape.js";

export default class Wall extends Block{
    texture;
    constructor(x,y) {
        super(x,y,'WALL','WALL');
        this.strategy = 'WALL';

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