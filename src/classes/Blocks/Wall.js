import Block from "../Block.js";
import chooseShape from "../../helperFunctions/chooseShape.js";

export default class Wall extends Block{
    texture;
    constructor(x,y,name) {
        super(x,y,name,'WALL');
        this.strategy = 'WALL';
        // noinspection JSUnusedGlobalSymbols
        this.alias = 'single';
        this.texture = "base";
    }
    draw(others){
        this.chooseName(others);
        return [...super.draw(),this.texture]
    }
    chooseName(neighbors){
        let others = this.updateAndFindNeighbors(neighbors);
        for(let direction in others){
            if(
                others[direction].name !== this.name ||
                !(others[direction] instanceof Wall)

            ){
                this.neighbors[direction] = false;
            }
        }
        let {left,down,right,up} = this.neighbors;

        this.alias = chooseShape([left,down,right,up]);
    }
}