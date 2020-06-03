import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";

export default class Win extends Trait {
    constructor(){
        super('WIN');
        this.right = true;
        this.left = true;
        this.up = true;
        this.down = true;
    }
    update(sprite,message) {
        sprite.canCollide = true;
        if(message.to === sprite.id){
            document.dispatchEvent(addMessage(new Message('system','win','YOU WIN')))
        }
    }
}