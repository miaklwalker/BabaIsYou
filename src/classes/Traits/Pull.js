import Trait from "./Trait.js";

export default class Pull extends Trait {
    constructor(){
        super('PULL');
    }
    update(sprite) {
        sprite.canCollide = true;
    }
}