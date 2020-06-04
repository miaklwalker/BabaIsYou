import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import makeLevelBuilder from "./helperFunctions/makeLevelBuilder.js";
import RuleParser from "./classes/RuleParser.js";
import enforcerFactory from "./helperFunctions/EnforceRules.js";
import makePage from "./production.js";
import tileMapperInit from "./LevelEditor/init.js";
import System from "./classes/System.js";

makePage(false);

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');



let system = new System();
let {game, messageCenter, movementParser} = system;
system.init();

let levelBuilder = makeLevelBuilder(game,messageCenter);
const {tint} = game.renderer;



export function gameStart({image, spriteSpec, levelSpec}){

    let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
    levelBuilder(spriteSpec, levelSpec);
    console.log(game.renderer.texture)
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
    console.log(system);
    game.timer.start()
}

game.setup(system.level).then(gameStart);

    game.timer.update = (deltaTime) => {
        game.renderer.render(game_canvas, game_context);
        messageCenter.update();
    };



