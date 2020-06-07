import Trait from "./Trait.js";

export default class Defeat extends Trait {
    constructor(){
        super('DEFEAT');
    }
    update(sprite,message) {
        sprite.canCollide = true;
    }
}