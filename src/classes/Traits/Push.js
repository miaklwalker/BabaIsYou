import Trait from "./Trait.js";

export default class Push extends Trait {
    constructor(){
        super('PUSH');
        this.right = true;
        this.left = true;
        this.up = true;
        this.down = true;
    }
    update(sprite,message) {

    }
}