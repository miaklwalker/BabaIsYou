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
import Vector from "./classes/Vector.js";
import newCollider from "./classes/Collisions.js";

makePage(false);

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let ruleParser;
let collider = new Collider();
let messageCenter = new MessageCenter();
let controls = new Controls();




let movement = {

}

let collision = {
    onMessage(msg){

    }
}





























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
            ruleParser = new RuleParser(enforcer);
            ruleParser.addWords(game.words.entities);
            ruleParser.parseRules();
            game.messageCenter.subscribe(ruleParser);

            tileMapperInit(game,game_canvas,0);

            game.addLayer(new Layer(1, drawBackground, ['black']),
                new Layer(2, drawGrid, [game.gridDiminsions]),
                new Layer(3, game.words.render, args),
                new Layer(3, game.tiles.render, args),
                new Layer(2, game.backgroundTiles.render, args),
                new Layer(4, game.sprites.render, args),
                new Layer(3, game.walls.render, args)
            );

            enforcer(ruleParser.rules);

            game.renderer.render(game_canvas, game_context);
            collider.update(game.allEntities);
            messageCenter.update();
            newCollider(game.allEntities);
            game.timer.start()
        });

    game.timer.update = (deltaTime) => {
        game.renderer.render(game_canvas, game_context);
        collider.update(game.allEntities);
        messageCenter.update();
    }
}
MAIN();
