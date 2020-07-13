import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";
import makeOrthagonalMap from "../../helperFunctions/makeOrthagonalMap.js";

export default class Win extends Trait {
    constructor(){
        super('WIN');
        this.right = true;
        this.left = true;
        this.up = true;
        this.down = true;
        this.ran = false;
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id && !this.ran ){
            console.log(message);
            const direction = message.data.direction;
            console.log(direction);
            let {candidates,results} = message.data.msg.data;
            let result = results ? results : [];
            let candidatesPool = [...candidates,...result]
                .filter(potential=>potential.YOU)
                .map(potential=>makeOrthagonalMap(potential)[direction])
                .map(potential=>potential.same(sprite.position))
                .includes(true);
            if(candidatesPool) {
                console.log("win")
                this.ran = true;
                document.dispatchEvent(addMessage(new Message('system', 'win', 'YOU WIN')))
            }
        }
    }
}