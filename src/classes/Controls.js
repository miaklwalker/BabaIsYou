import addMessage from "../CustomEvents/addmessage.js";

const keys = {
    UP:Symbol('up'),
    DOWN:Symbol('down'),
    RIGHT:Symbol('right'),
    LEFT:Symbol('left'),
}
const {UP,DOWN,RIGHT,LEFT} = keys

export default class Controls { 
    constructor(){
        this[UP] = false;
        this[DOWN] = false;
        this[RIGHT] = false;
        this[LEFT] = false;
        this.restart = false;
        this.keyMap  = {
            KeyA:LEFT,
            KeyD:RIGHT,
            KeyW:UP,
            KeyS:DOWN
        }
    }
    keyDown=(event)=>{
        const keyPressed = this.keyMap[event.code];
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

