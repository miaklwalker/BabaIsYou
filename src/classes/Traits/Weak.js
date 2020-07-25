import Trait from "./Trait.js";

export default class Weak extends Trait {
    constructor(){
        super('WEAK');
    }
    update(sprite) {
        sprite.canTouch = true;
    }
}