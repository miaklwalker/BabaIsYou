import Trait from "./Trait.js";

export default class Stop extends Trait {
    constructor(){
        super('STOP');
        this.right = true;
        this.left = true;
        this.up = true;
        this.down = true;
    }
    update(sprite,message) {

    }
}