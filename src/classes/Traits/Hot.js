import Trait from "./Trait.js";
//done
export default class Hot extends Trait {
    constructor(){
        super('HOT');
    }
    update(sprite,message) {
        sprite.canTouch = true;
    }
}