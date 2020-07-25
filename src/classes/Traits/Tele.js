import Trait from "./Trait.js";

export default class Tele extends Trait {
    constructor(){
        super('TELE');
    }
    update(sprite) {
        sprite.canTouch = true;
    }
}