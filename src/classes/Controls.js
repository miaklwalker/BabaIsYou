import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";


const directions = {
    UP:Symbol('up'),
    DOWN:Symbol('down'),
    LEFT:Symbol('left'),
    RIGHT:Symbol('right'),
    RESTART:Symbol('restart'),
};


class KeyMap{
    mapKey(keyCode,symbol){
        this[keyCode] = symbol;
    }
}

const defaultControls = new KeyMap();

defaultControls.mapKey('KeyA',directions.LEFT);
defaultControls.mapKey('KeyD',directions.RIGHT);
defaultControls.mapKey('KeyW',directions.UP);
defaultControls.mapKey('KeyS',directions.DOWN);
// Arrow Controls
defaultControls.mapKey("ArrowRight",directions.RIGHT);
defaultControls.mapKey("ArrowLeft",directions.LEFT);
defaultControls.mapKey("ArrowUp",directions.UP);
defaultControls.mapKey("ArrowDown",directions.DOWN);
// Restart
defaultControls.mapKey('KeyR',directions.RESTART);

const dispatchMessageFromControls = (code,direction,action) =>{
    document.dispatchEvent(addMessage(new Message('parser','controls',{keyPressed: code,direction,action})));
};


export default class Controls { 
    constructor(){
        this[directions.UP] = false;
        this[directions.DOWN] = false;
        this[directions.RIGHT] = false;
        this[directions.LEFT] = false;
        this[directions.RESTART] = false;

        this.keyMap  = defaultControls;
        this.timeout = 150;
        this.lastPressed = '';
        this.lockOut = false;
    }
    keyDown=(event)=>{
        const keyPressed = this.keyMap[event.code];
        if(keyPressed === undefined )return;
        if( keyPressed === directions.RESTART){
            document.dispatchEvent(addMessage(new Message('system','controls','RESTART')));
            return
        }
        if(!this[keyPressed]&&!this.lockOut){
            this[keyPressed] = true;
            this.lockOut = true;
            dispatchMessageFromControls(event.code,keyPressed.description,'run');
            this.lastPressed = keyPressed.description;
            setTimeout(() => {
                this[keyPressed] = false;
            }, this.timeout);
        }
    };
    keyUp = (event)=>{
        const keyPressed = this.keyMap[event.code];
        this[keyPressed] = false;
        if(keyPressed === undefined || keyPressed === directions.RESTART)return;
        if(this.allUp()){
            dispatchMessageFromControls(event.code,this.lastPressed,'idle')
        }

    };
    allUp(){
        const {UP,LEFT,RIGHT,DOWN} = directions;
        return !this[UP] && !this[DOWN] && !this[RIGHT] && !this[LEFT];
    }
    onMessage(message){
        if(message.to === 'controls'){
            this.lockOut = false;
        }
    }
}

