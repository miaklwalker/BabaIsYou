import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class SpriteBlock extends Block{
    constructor(x,y,name,id = makeUniqueId(12)) {
        super(x,y);
        this.name = name;
        this.group ='words';
        this.type = 'sprites';
        this.id = id;
    }
    draw(){
        return [...super.draw(),this.name,this.group,this.type,this.id]
    }

}