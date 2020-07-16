import Trait from "./Trait.js";
import defeat from "../../helperFunctions/implementDefeat.js";






export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id ) {
            defeat(message, sprite)
        }
    }
}