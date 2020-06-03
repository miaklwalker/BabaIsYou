import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import makeLevelBuilder from "./helperFunctions/makeLevelBuilder.js";
import RuleParser from "./classes/RuleParser.js";
import enforcerFactory from "./helperFunctions/EnforceRules.js";
import Collider from "./classes/Collider.js";
import MessageCenter from "./classes/MessageCenter.js";
import makePage from "./production.js";
import Controls from "./classes/Controls.js";
import tileMapperInit from "./LevelEditor/init.js";
import MovementParser from "./classes/MovementParser.js";
import startTest from "../testLibrary/modules/startTest.js";

makePage(false);

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

class System{
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

let system = new System();
let {game, messageCenter, movementParser} = system;
system.init();

let levelBuilder = makeLevelBuilder(game,messageCenter);
const {tint} = game.renderer;



function gameStart({image, spriteSpec, levelSpec}){

    let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
    levelBuilder(spriteSpec, levelSpec);
    game.walls.makeTextures(game.renderer.texture);

    let args = [image, spriteSheets, tint];

    let enforcer = enforcerFactory(game.entities);

    movementParser.entities.push(game.allEntities);

    let ruleParser = new RuleParser(enforcer);
    ruleParser.addWords(game.words.entities);
    ruleParser.parseRules();
    messageCenter.subscribe(ruleParser);

    tileMapperInit(game,game_canvas,0);

    game.addLayer(
        new Layer(1, drawBackground, ['black']),
        new Layer(0, drawGrid, [game.gridDiminsions]),
        new Layer(3, game.words.render, args),
        new Layer(2, game.tiles.render, args),
        new Layer(1, game.backgroundTiles.render, args),
        new Layer(4, game.sprites.render, args),
        new Layer(2, game.walls.render, args)
    );

    game.timer.start()
}

game.setup(system.level).then(gameStart);

    game.timer.update = (deltaTime) => {
        game.renderer.render(game_canvas, game_context);
        messageCenter.update();
    };



