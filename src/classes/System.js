import Game from "./Game.js";
import Collider from "./Collider.js";
import MessageCenter from "./MessageCenter.js";
import Controls from "./Controls.js";
import MovementParser from "./MovementParser.js";
import startTest from "../../testLibrary/modules/startTest.js";

export default class System{
    constructor(){
        this.game = new Game();
        this.collider= new Collider();
        this.messageCenter = new MessageCenter();
        this.controls = new Controls();
        this.movementParser = new MovementParser();
        this.initialized = false;
        this.level = 1
    }
    init(){
        if(!this.initialized){
            document.addEventListener('keydown', this.controls.keyDown);
            document.addEventListener('keyup', this.controls.keyUp);
            document.addEventListener('addmessage', this.messageCenter.handleAddMessage);
            startTest('../../test.spec.json',3);
            this.initialized = true;
        }
        this.messageCenter.subscribe(this.movementParser);
        this.messageCenter.subscribe(this.collider);
        this.messageCenter.subscribe(this.controls);
        this.messageCenter.subscribe(this);
    }
    restart(){
        this.movementParser.purge();
        game.tiles.purge();
        game.sprites.purge();
        game.walls.purge();
        game.backgroundTiles.purge();
        game.words.purge();
        game.renderer.purge();
        this.messageCenter.purge();
        this.init();
        game.setup(this.level).then(gameStart);
    }
    onMessage(message){
        if(message.to === 'system'){
            if(message.from === 'win'){
                this.level++;
            }
            this.restart()
        }
    }
}