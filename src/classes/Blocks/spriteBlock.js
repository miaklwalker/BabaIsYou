import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class SpriteBlock extends Block{
    YOU;
    constructor(x,y,name) {
        super(x,y);
        this.name = name;
        this.group ='sprites';
        this.type = 'sprites';
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
        this.direction = message.data.direction;
        if(message.action !== 'restart' && this.YOU !== undefined && message.from === 'controls' ) {
            this.action = message.data.action;
        }
    }

}