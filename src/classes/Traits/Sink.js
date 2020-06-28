import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";

export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id ){
            let {candidates,results} = message.data.msg.data;
            let toCheck = [...results,...candidates]
            if(toCheck.map(candidate=>sprite.isNeighbor(candidate)).includes(true)){
                let sunk = [...results,...candidates].filter(candidate=>sprite.isNeighbor(candidate));
                console.log(sunk);
                document.dispatchEvent(addMessage(new Message('system','defeat',[sprite,sunk[0]])))
            }
        }
    }
}