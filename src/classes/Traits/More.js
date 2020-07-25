import Trait from "./Trait.js";

export default class More extends Trait {
    constructor(){
        super('MORE');
    }
    update(sprite) {
        sprite.canCollide = true;
    }
}