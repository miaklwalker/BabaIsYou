import Trait from "./Trait.js";

export default class Push extends Trait {
    constructor(){
        super('PUSH');
    }
    update(sprite,message) {
        sprite.canCollide = true;
        if(message.to === sprite.id){
            switch(message.data.direction){
                case "left":
                    sprite.position.x -= 1;
                    break;
                case "right":
                    sprite.position.x += 1;
                    break;
                case "up":
                    sprite.position.y -= 1;
                    break;
                case "down":
                    sprite.position.y += 1;
                    break;
            }
        }
    }
}