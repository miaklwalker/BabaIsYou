import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class PropertyBlock extends Block{
    constructor(x,y,name,type,id = makeUniqueId(12)) {
        super(x,y);
        this.name = name;
        this.group ='words';
        this.type = 'properties';
        this.id = id;
    }
    draw(){
        return [...super.draw(),this.name,this.group,this.type,this.id]
    }
}