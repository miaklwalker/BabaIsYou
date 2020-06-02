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

makePage(false);

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let ruleParser;
let collider = new Collider();
let messageCenter = new MessageCenter();
let controls = new Controls();
let movementParser = new MovementParser();

messageCenter.subscribe(movementParser);
messageCenter.subscribe(collider);


document.addEventListener('keydown', controls.keyDown);
document.addEventListener('keyup', controls.keyUp);
document.addEventListener('addmessage', messageCenter.handleAddMessage);

let game = new Game(messageCenter);
let levelBuilder = makeLevelBuilder(game,messageCenter);
const {tint} = game.renderer;
game.setup().then(
    ({image, spriteSpec, levelSpec}) => {

            let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
            let args = [image, spriteSheets, tint];
            levelBuilder(spriteSpec, levelSpec);

            game.walls.makeTextures(game.renderer.texture);

            let enforcer = enforcerFactory(game.entities);

            movementParser.entities.push(game.allEntities);

            ruleParser = new RuleParser(enforcer);
            ruleParser.addWords(game.words.entities);
            ruleParser.parseRules();
            messageCenter.subscribe(ruleParser);

            enforcer(ruleParser.rules);

            tileMapperInit(game,game_canvas,0);

            game.addLayer(
                new Layer(1, drawBackground, ['black']),
                new Layer(0, drawGrid, [game.gridDiminsions]),
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
        messageCenter.update();
    }



