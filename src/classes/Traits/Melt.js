import Trait from "./Trait.js";
import defeatImplement from "../../helperFunctions/implementDefeat.js";

export default class Melt extends Trait {
    constructor(){
        super('MELT');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id ){
            const {results,overlaps,candidates} = message.data.msg.data;
            const {direction} = message.data;
            let toCheck = [...results,...overlaps,...candidates];
            toCheck.forEach(entity=>{
                defeatImplement(entity,sprite,undefined,direction,"HOT");
            })
        };
    }
}