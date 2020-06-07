import Trait from "./Trait.js";

export default class Shut extends Trait {
    constructor(){
        super('SHUT');
    }
    update(sprite,message) {
        sprite.canCollide = true;
    }
}