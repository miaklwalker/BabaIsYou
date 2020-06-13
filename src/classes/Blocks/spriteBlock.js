import makeUniqueId from "../../helperFunctions/MakeID.js";
import Block from "../Block.js";

export default class SpriteBlock extends Block{
    YOU;
    constructor(x,y,name) {
        super(x,y,name,'sprites');
        this.strategy = 'SPRITE';
        this.group ='sprites';
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
        if(message.action !== 'restart' && this.YOU !== undefined && message.from === 'controls' ) {
            this.action = message.data.action;
            this.direction = message.data.direction;
        }
    }

}