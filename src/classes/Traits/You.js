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