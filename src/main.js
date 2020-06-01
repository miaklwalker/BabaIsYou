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

import addMessage from "./CustomEvents/addmessage.js";
import Message from "./classes/Message.js";

makePage(false);

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let ruleParser;
let collider = new Collider();
let messageCenter = new MessageCenter();
let controls = new Controls();




class MovementParser{
    constructor(){
        this.entities = [];
    }
    onMessage(msg){
        if(msg.to === 'parser'){
            document.dispatchEvent(addMessage(new Message('collision', 'parser',{entities:this.entities.flat(),msg},)));
        }
    }

}


let movementParser = new MovementParser();
messageCenter.subscribe(movementParser);
messageCenter.subscribe(collider);


document.addEventListener('keydown', controls.keyDown);
document.addEventListener('keyup', controls.keyUp);
document.addEventListener('addmessage', messageCenter.handleAddMessage);


let game;

export default function MAIN() {
    game = new Game(messageCenter);
    let levelBuilder = makeLevelBuilder(game);
    const {tint} = game.renderer;

    game.setup()
        .then(({image, spriteSpec, levelSpec}) => {

            let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
            let args = [image, spriteSheets, tint];
            levelBuilder(spriteSpec, levelSpec);

            game.walls.makeTextures(game.renderer.texture);
            let enforcer = enforcerFactory(game.entities);

            movementParser.entities.push(game.entities);

            ruleParser = new RuleParser(enforcer);
            ruleParser.addWords(game.words.entities);
            ruleParser.parseRules();
            game.messageCenter.subscribe(ruleParser);
            enforcer(ruleParser.rules);
            tileMapperInit(game,game_canvas,0);

            game.addLayer(new Layer(1, drawBackground, ['black']),
                new Layer(2, drawGrid, [game.gridDiminsions]),
                new Layer(3, game.words.render, args),
                new Layer(3, game.tiles.render, args),
                new Layer(2, game.backgroundTiles.render, args),
                new Layer(4, game.sprites.render, args),
                new Layer(3, game.walls.render, args)
            );

            game.timer.start()
        });

    game.timer.update = (deltaTime) => {
        game.renderer.render(game_canvas, game_context);
       // collider.update(game.allEntities);
        messageCenter.update();
    }
}
MAIN();
