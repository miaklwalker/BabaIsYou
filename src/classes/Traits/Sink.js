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
            console.log(results);
            if([...results,...candidates].map(candidate=>sprite.isNeighbor(candidate)).includes(true)){
                let resultSunk = results.filter(candidate=>sprite.isNeighbor(candidate));
                let candidateSunk = results.filter(candidate=>sprite.isNeighbor(candidate));
                let sunk = resultSunk;
                console.log(candidateSunk.length,resultSunk.length);
                document.dispatchEvent(addMessage(new Message('system','defeat',[sprite,sunk[sunk.length-1]])))
            }
        }
    }
}