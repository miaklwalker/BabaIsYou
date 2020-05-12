import addMessage from "../CustomEvents/addmessage.js";


const UP      = Symbol('up');
const DOWN    = Symbol('down');
const RIGHT   = Symbol('right');
const LEFT    = Symbol('left');
const RESTART = Symbol('restart');


class KeyMap{
    mapKey(keyCode,symbol){
        this[keyCode] = symbol;
    }
}

const defaultControls = new KeyMap();
defaultControls.mapKey('KeyA',LEFT);
defaultControls.mapKey('KeyD',RIGHT);
defaultControls.mapKey('KeyW',UP);
defaultControls.mapKey('KeyS',DOWN);
defaultControls.mapKey('KeyR',RESTART);


const dispatchMessageFromControls = (code,direction,action) =>{
    document.dispatchEvent(
        addMessage({
            to:'you',
            from:'controls',
            keyPressed:code,
            direction,
            action,
        }));
};

export default class Controls { 
    constructor(){
        this[UP] = false;
        this[DOWN] = false;
        this[RIGHT] = false;
        this[LEFT] = false;
        this[RESTART] = false;
        this.keyMap  = defaultControls;
        this.timeout = 300;
        this.lastPressed = ''
    }
    keyDown=(event)=>{
        const keyPressed = this.keyMap[event.code];
        if(keyPressed === undefined)return;
        if(!this[keyPressed]){
            this[keyPressed] = true;
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
        if(this.allUp()){
            dispatchMessageFromControls(event.code,this.lastPressed,'idle')
        }

    };
    allUp(){
        return !this[UP] && !this[DOWN] && !this[RIGHT] && !this[LEFT];
    }
}

