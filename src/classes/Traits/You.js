import Trait from "./Trait.js";

export default class You extends Trait {
    constructor(){
        super();
        this.right = true;
        this.left = true;
        this.up = true;
        this.down = true;
    }
    update(sprite,message){
        let direction = message.direction;
        this[direction] = false;
        if(message.action === 'run') {
            if (direction === 'right') {
                sprite.position.x++
            }
            if (direction === 'left') {
                sprite.position.x--
            }
            if (direction === 'up') {
                sprite.position.y--
            }
            if (direction === 'down') {
                sprite.position.y++
            }
        }
    }
}