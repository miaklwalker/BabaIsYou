import Trait from "./Trait.js";

export default class Push extends Trait {
    constructor(){
        super('PUSH');
        this.right = false;
        this.left = false;
        this.up = false;
        this.down = false;
    }
    update(sprite,message) {
        sprite.canCollide = true;
        if(message.to === sprite.id){
            const [left,down,right,up]=message.data;
            this.left = left;
            this.right = right;
            this.down = down;
            this.up = up;
        }
        else if(message.to === 'you' && message.data.action ==='run'){
            let direction = message.data.direction;
            if( direction === 'left' && this[direction] )sprite.position.x -= 1;
            if( direction === 'right' && this[direction] )sprite.position.x += 1;
            if( direction === 'up' && this[direction] )sprite.position.y -= 1;
            if( direction === 'down' && this[direction] )sprite.position.y += 1;
        }
    }
}