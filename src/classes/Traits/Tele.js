import Trait from "./Trait.js";

export default class Tele extends Trait {
    constructor(){
        super('TELE');
    }
    update(sprite,message) {
        sprite.canCollide = true;
    }
}