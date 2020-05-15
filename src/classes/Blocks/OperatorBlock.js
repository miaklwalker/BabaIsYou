import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class OperatorBlock extends Block{
    constructor(x,y,name) {
        super(x,y);
        this.name = name;
        this.group ='words';
        this.type = 'operators';
    }
    draw(){
        return [...super.draw(),this.name,this.group,this.type,this.id]
    }
}