import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class SpriteBlock extends Block{
    constructor(x,y,name,id = makeUniqueId(12)) {
        super(x,y);
        this.name = name;
        this.group ='sprites';
        this.type = 'sprites';
        this.id = id;
        this.direction='right';
        this.action = 'idle'
    }
    draw(){
        return [
            ...super.draw(),
            this.name,
            this.group,
            this.type,
            this.id,
            this.direction,
            this.action
        ]
    }
    onMessage(message) {
        super.onMessage(message);
        this.direction = message.direction;
        this.action = message.action;
    }

}