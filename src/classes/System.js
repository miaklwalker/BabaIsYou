import Game from "./Game.js";
import Collider from "./Collider.js";
import MessageCenter from "./MessageCenter.js";
import Controls from "./Controls.js";
import MovementParser from "./MovementParser.js";
import {gameStart} from "../main.js";
import MasterList from "./MasterList.js";

export default class System{
    constructor(){
        this.masterList =       new MasterList();
        this.game =             new Game(this.masterList);
        this.collider=          new Collider();
        this.messageCenter =    new MessageCenter(this.masterList);
        this.movementParser =   new MovementParser(this.masterList);
        this.controls = new Controls();
        this.initialized = false;
        this.level = 1;
    }
    init(){
        if(!this.initialized){
            document.addEventListener('keydown', this.controls.keyDown);
            document.addEventListener('keyup', this.controls.keyUp);
            document.addEventListener('addmessage', this.messageCenter.handleAddMessage);
            this.initialized = true;
        }
        this.messageCenter.subscribe(this.movementParser);
        this.messageCenter.subscribe(this.collider);
        this.messageCenter.subscribe(this.controls);
        this.messageCenter.subscribe(this);
    }
    restart(){
            this.masterList.purge();
            this.game.renderer.purge();
            this.init();
            this.game.setup(this.level).then(gameStart);
    }
    removeEntity(id){
        this.masterList.removeEntity(id);
    }
    onMessage(message){
        let toSystem = message.to === 'system';
        if( toSystem && message.from !== 'defeat'){
            if(message.from === 'win'){
                if(this.level < 5){
                    this.level++;
                }else{
                    this.level = 1;
                }
            }
            this.restart()
        }else if(toSystem){
            let id = message.data;
            if(Array.isArray(id)){
                id.forEach(i=>this.removeEntity(i))
            }else{
                this.removeEntity(id)
            }
        }
    }
}