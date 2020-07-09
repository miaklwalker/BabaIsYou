import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";

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
            let {candidates,results} = message.data.msg.data;
            let result = results ? results : [];
            let candidatesPool = [...candidates,...result]
                .filter(potential=>potential.YOU)
                .map(potential=>potential.position.same(sprite.position))
                .includes(true);
            if(candidatesPool) {
                this.ran = true;
                document.dispatchEvent(addMessage(new Message('system', 'win', 'YOU WIN')))
            }
        }
    }
}