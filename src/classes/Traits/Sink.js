import Trait from "./Trait.js";
import defeatImplement from "../../helperFunctions/implementDefeat.js";
import makeOrthagonalMap from "../../helperFunctions/makeOrthagonalMap.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";





export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id && !this.ran ){
            const direction = message.data.direction;
            let {candidates,results,overlaps} = message.data.msg.data;
            let result = results ? results : [];
            let candidatesPool = [...candidates,...result,...overlaps]
                .map(potential=>makeOrthagonalMap(potential)[direction])
                .map(potential=>potential.same(sprite.position))
            if(candidatesPool.includes(true)) {
                this.ran = true;
                document.dispatchEvent(addMessage(new Message('system', 'defeat', sprite.id)))
                candidatesPool.forEach(({id})=>{
                    console.log(id)
                    document.dispatchEvent(addMessage(new Message('system','defeat',id)))
                })
            }
        }
    }
}