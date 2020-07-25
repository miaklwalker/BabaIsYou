import Trait from "./Trait.js";

export default class Move extends Trait {
    constructor(){
        super('MOVE');
    }
    update(sprite) {
        sprite.canCollide = true;
    }
}