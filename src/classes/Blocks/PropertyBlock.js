import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class PropertyBlock extends Block{
    constructor(x,y,name) {
        super(x,y);
        this.name = name;
        this.group ='words';
        this.type = 'properties';
    }
    draw(){
        return [...super.draw(),this.name,this.group,this.type,this.id]
    }
}