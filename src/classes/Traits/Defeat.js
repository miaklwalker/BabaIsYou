import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";
import defeatImplement from "../../helperFunctions/implementDefeat.js";
//done
export default class Defeat extends Trait {
    constructor(){
        super('DEFEAT');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id ){
            const {results,overlaps,candidates} = message.data.msg.data;
            const {direction} = message.data;
            let toCheck = [...results,...overlaps,...candidates];
            toCheck.forEach(entity=>{
                defeatImplement(entity,sprite,false,direction,"YOU");
            })
        };
    }
}