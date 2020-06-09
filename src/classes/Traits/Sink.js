import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";

export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
        sprite.canCollide = true;
        if(message.to === sprite.id ){
            let candidates = message.data.msg.data.candidates;
            if(candidates.map(candidate=>sprite.isNeighbor(candidate)).includes(true)){
                let sunk = candidates.filter(candidate=>sprite.isNeighbor(candidate));
                document.dispatchEvent(addMessage(new Message('system','defeat',[sprite,sunk[0]])))
            }
        }
    }
}