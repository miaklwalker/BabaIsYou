import Trait from "./Trait.js";

export default class Melt extends Trait {
    constructor(){
        super('MELT');
    }
    update(sprite,message) {
        sprite.canTouch = true;
    }
}