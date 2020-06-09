import Game from "./Game.js";
import Collider from "./Collider.js";
import MessageCenter from "./MessageCenter.js";
import Controls from "./Controls.js";
import MovementParser from "./MovementParser.js";
import startTest from "../../testLibrary/modules/startTest.js";
import {gameStart} from "../main.js";

export default class System{
    constructor(){
        this.game = new Game();
        this.collider= new Collider();
        this.messageCenter = new MessageCenter();
        this.controls = new Controls();
        this.movementParser = new MovementParser();
        this.initialized = false;
        this.restartInProgress = true;
        this.level = 4
    }
    init(){
        if(!this.initialized){
            document.addEventListener('keydown', this.controls.keyDown);
            document.addEventListener('keyup', this.controls.keyUp);
            document.addEventListener('addmessage', this.messageCenter.handleAddMessage);
            startTest('../../test.spec.json',1);
            this.initialized = true;
        }
        this.messageCenter.subscribe(this.movementParser);
        this.messageCenter.subscribe(this.collider);
        this.messageCenter.subscribe(this.controls);
        this.messageCenter.subscribe(this);
    }
    restart(){
            this.restartInProgress = true;
            this.movementParser.purge();
            this.game.tiles.purge();
            this.game.sprites.purge();
            this.game.walls.purge();
            this.game.backgroundTiles.purge();
            this.game.words.purge();
            this.game.renderer.purge();
            this.messageCenter.purge();
            this.init();
            this.game.setup(this.level).then(gameStart);
            this.restartInProgress = false;
    }
    removeEntity(id){
        this.messageCenter.unsubscribe(id);
        this.game.removeEntity(id);
        this.movementParser.removeEntity(id)
    }
    onMessage(message){
        let toSystem = message.to === 'system';
        if(toSystem && message.from !== 'defeat'){
            if(message.from === 'win'){
                if(this.level < 4){
                    this.level++;
                }else{
                    alert(`You've Beat All The Levels I Have So Far!`);
                    this.level = 1;
                }

            }
            this.restart()
        }else if(toSystem){
            let [tile,sprite] = message.data;
            this.removeEntity(tile);
            this.removeEntity(sprite)
        }
    }
}