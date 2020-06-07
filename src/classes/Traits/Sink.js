import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";

export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
       // sprite.canCollide = true;
        if(message.to === sprite.id ){
            if(message.data.msg.data.candidates.map(candidate=>sprite.isNeighbor(candidate)).includes(true)){
                this.ran = true;
                document.dispatchEvent(addMessage(new Message('system','Sink','YOU WIN')))
            }
        }
    }
}