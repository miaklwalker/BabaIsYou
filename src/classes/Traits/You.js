import Trait from "./Trait.js";

export default class You extends Trait {
    constructor(){
        super('YOU');
        this.right = true;
        this.left = true;
        this.up = true;
        this.down = true;
    }
    update(sprite,message) {
        console.log(message);
        if (message.to === 'you') {
            let direction = message.data.direction;
            //this[direction] = false;
            if (message.data.action === 'run') {
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
}