import Trait from "./Trait.js";

export default class Stop extends Trait {
    constructor(){
        super('STOP');
    }
    update(sprite,message) {
        sprite.canCollide = true;
    }
}