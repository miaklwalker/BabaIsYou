import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class PropertyBlock extends Block{
    constructor(x,y,name) {
        super(x,y,name,'properties');
        this.strategy = 'WORD';
        this.group ='words';
    }
    draw(){
        return [...super.draw(),this.name,this.group,this.type,this.id]
    }
}