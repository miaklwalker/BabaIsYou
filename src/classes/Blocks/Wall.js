import Block from "../Block.js";
import chooseShape from "../../helperFunctions/chooseShape.js";

export default class Wall extends Block{
    constructor(x,y) {
        super(x,y);
        this.type = 'WALL';
        this.name = 'WALL';
        this.ran = false;
    }
    draw(others){
        this.chooseName(others);
        return [...super.draw(),this.name,undefined,this.type]
    }
    chooseName(neighbors){
        this.updateAndFindNeighbors(neighbors);
        let {left,down,right,up} = this.neighbors;
        this.name = chooseShape([left,down,right,up]);
    }
}