import Trait from "./Trait.js";

export default class Stop extends Trait {
    constructor(){
        super('STOP');
        this.right =false;
        this.left = false;
        this.up = false;
        this.down = false;
    }
    update(sprite,message) {
        sprite.canCollide = true;

    }
}