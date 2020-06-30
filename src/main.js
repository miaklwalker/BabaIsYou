import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import makeLevelBuilder from "./helperFunctions/makeLevelBuilder.js";
import RuleParser from "./classes/RuleParser.js";
import enforcerFactory from "./helperFunctions/EnforceRules.js";
import tileMapperInit from "./LevelEditor/init.js";
import System from "./classes/System.js";


const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let system = new System();
let {game, messageCenter} = system;

system.init();

let levelBuilder = makeLevelBuilder(game,system.masterList);

const {tint} = game.renderer;

export function gameStart({image, spriteSpec, levelSpec}){

    let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
    levelBuilder(spriteSpec, levelSpec);
    game.foreGround.makeTextures(game.renderer);

    let args = [image, spriteSheets, tint];
    let useRules = system.masterList.allOfFlags('useRules');
    let enforcer = enforcerFactory(useRules);

    let ruleParser = new RuleParser(enforcer,system.masterList);

    ruleParser.parseRules();

    messageCenter.subscribe(ruleParser);

    tileMapperInit(game,game_canvas,5);

    game.addLayer(
        new Layer(1, drawBackground, ['black']),
        new Layer(0, drawGrid, [game.gridDiminsions]),
        new Layer(5, game.topLevel.render,   args),
        new Layer(4, game.foreGround.render, args),
        new Layer(3, game.backGround.render, args),
    );

    game.timer.start()
}

game.setup(system.level).then(gameStart);
    game.timer.update = () => {
        game.renderer.render(game_canvas, game_context);
        messageCenter.update();
    };

console.log(system);