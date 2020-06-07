import Trait from "./Trait.js";

export default class Hot extends Trait {
    constructor(){
        super('HOT');
    }
    update(sprite,message) {
        sprite.canCollide = true;
    }
}