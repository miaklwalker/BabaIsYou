import Trait from "./Trait.js";

export default class Open extends Trait {
    constructor(){
        super('OPEN');
    }
    update(sprite,message) {
        sprite.canCollide = true;
    }
}