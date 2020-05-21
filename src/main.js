import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import makeLevelBuilder from "./helperFunctions/makeLevelBuilder.js";
import RuleParser from "./classes/RuleParser.js";
import enforceRules from "./helperFunctions/EnforceRules.js";
import Collider from "./classes/Collider.js";
import MessageCenter from "./classes/MessageCenter.js";
import TileMapper from "./LevelEditor/levelEditor.js";
import makePage from "./production.js";
import Controls from "./classes/Controls.js";

makePage(false);

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let ruleParser;
const collider = new Collider();
const messageCenter = new MessageCenter();
const controls = new Controls();

document.addEventListener('keydown', controls.keyDown);
document.addEventListener('keyup', controls.keyUp);
document.addEventListener('addmessage', messageCenter.handleAddMessage);

const handleMapper = tileMapper => ()=> {
    let name = document.getElementById('name').value;
    let output = document.getElementById('select').value;
    TM.export(name, output);
};
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

            ruleParser = new RuleParser(enforceRules(game.entities));
            ruleParser.addWords(game.words.entities);
            ruleParser.parseRules();
            enforceRules(game.entities);
            game.messageCenter.subscribe(ruleParser);


            let TM = TileMapper(game_canvas, game.gridDiminsions);
            game_canvas.addEventListener('click', TM.handleClick);
            game.addLayer(new Layer(0, TM.render));
            document.getElementById('export').addEventListener('click',handleMapper(TM));

            game.addLayer(new Layer(1, drawBackground, ['black']),
                new Layer(1, drawGrid, [game.gridDiminsions]),
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
        collider.update(game.allEntities);
        messageCenter.update();
    }
}
MAIN();
