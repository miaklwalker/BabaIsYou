import Trait from "./Trait.js";




export default class You extends Trait {
    constructor(){
        super('YOU');
        this.right = false;
        this.left = false;
        this.up = false;
        this.down = false;
    }
    update(sprite,message) {
        if (message.to === 'you' && message.from === 'controls') {
            let direction = message.data.direction;
            if (message.data.action === 'run' && !this[direction]) {
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
        else if(message.to === 'you' && message.from === 'collider'){
                const [left,down,right,up] = message.data;
                this.left = left;
                this.right = right;
                this.down = down;
                this.up = up;
        }
    }
}