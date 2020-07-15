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
            let entities = [...candidates,...result,...overlaps]
            let candidatesPool = entities
                .map(potential=>makeOrthagonalMap(potential)[direction])
                .map(potential=>potential.same(sprite.position));
            let collisionPool = entities.filter((item,index)=>{
                if(candidatesPool[index]){
                    return item;
                }
            });
            if(candidatesPool.includes(true)) {
                this.ran = true;
                document.dispatchEvent(addMessage(new Message('system', 'defeat', sprite.id)));
                collisionPool.forEach(({id})=>{
                    document.dispatchEvent(addMessage(new Message('system', 'defeat', id)))
                })
            }
        }
    }
}