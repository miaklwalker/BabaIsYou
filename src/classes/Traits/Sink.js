import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";
import Vector from "../Vector.js";
import defeatImplement from "../../helperFunctions/implementDefeat.js";





export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id ){
            const {results,overlaps,candidates} = message.data.msg.data;
            const {direction} = message.data;
            let toCheck = [...results,...overlaps,...candidates];
            toCheck.forEach(entity=>{
                defeatImplement(entity,sprite,"FLOAT",direction);
            })
        };
    }
}