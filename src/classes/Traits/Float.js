import Trait from "./Trait.js";

export default class Float extends Trait {
    constructor(){
        super('FLOAT');
    }
    update(sprite,message) {
        sprite.canCollide = true;
    }
}