import Trait from "./Trait.js";

export default class Win extends Trait {
    constructor(){
        super('WIN');
        this.right = true;
        this.left = true;
        this.up = true;
        this.down = true;
    }
    update(sprite,message) {
    }
}