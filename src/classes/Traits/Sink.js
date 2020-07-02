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
            const {results,overlaps,candidates} = message.data.msg.data;
            let toCheck = [...results,...overlaps,...candidates];
            console.log(toCheck);
            toCheck.forEach(entity=>{
                if(entity.position.same(sprite.position)){
                    console.log(entity.name);
                    document.dispatchEvent(addMessage(new Message('system','defeat',entity.id)))
                }else{
                    console.log(entity.name);
                    console.log(sprite.position);
                    console.log(entity.position);
                }
            })
        }
    }
}