import addMessage from "../CustomEvents/addmessage.js";

const keys = {
    UP:Symbol('up'),
    DOWN:Symbol('down'),
    RIGHT:Symbol('right'),
    LEFT:Symbol('left'),
    RESTART:Symbol('restart'),
};
const {UP,DOWN,RIGHT,LEFT,RESTART} = keys;

export default class Controls { 
    constructor(){
        this[UP] = false;
        this[DOWN] = false;
        this[RIGHT] = false;
        this[LEFT] = false;
        this[RESTART] = false;
        this.keyMap  = {
            KeyA:LEFT,
            KeyD:RIGHT,
            KeyW:UP,
            KeyS:DOWN,
            KeyR:RESTART,
        }
    }
    keyDown=(event)=>{
        const keyPressed = this.keyMap[event.code];
        if(keyPressed === undefined)return;
        if(!this[keyPressed]){
            this[keyPressed] = true;
            document.dispatchEvent(
                addMessage({
                    to:'you',
                    from:'controls',
                    keyPressed:event.code,
                    direction:keyPressed.description
                }
            ));
            setTimeout(() => {
                this[keyPressed] = false;
            }, 300);
        }
    }
    keyUp = (event)=>{
        const keyPressed = this.keyMap[event.code];
        this[keyPressed] = false;
    }
}

