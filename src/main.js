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

makePage(false);
const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let ruleParser;
const collider = new Collider();
const messageCenter = new MessageCenter();
document.addEventListener('addmessage',messageCenter.handleAddMessage);
let game;







export default function MAIN () {
        game = new Game(messageCenter);
        let levelBuilder = makeLevelBuilder(game);

        game.setup()
            .then(({image, spriteSpec, levelSpec}) => {
                const {tint} = game.renderer;

                let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
                let args = [image, spriteSheets, tint];
                levelBuilder(spriteSpec, levelSpec);

                ruleParser =  new RuleParser(enforceRules(game.entities));
                ruleParser.addWords(game.words.entities);
                ruleParser.parseRules();

                game.messageCenter.subscribe(ruleParser);


                let TM = TileMapper(game_canvas,game.gridDiminsions)
                game_canvas.addEventListener('click',TM.handleClick);
                document.addEventListener('keydown',ev=>{
                   if(ev.code==='KeyE'){
                           let name = document.getElementById('name');
                           TM.export(name.value);
                   }
                });
                game.addLayer(new Layer(3,TM.render));
                game.addLayer(new Layer(1, drawBackground, ['black']));
                game.addLayer(new Layer(1, drawGrid, [game.gridDiminsions]));
                game.addLayer(new Layer(1, game.words.render, args));
                game.addLayer(new Layer(2, game.tiles.render, args));
                game.addLayer(new Layer(1, game.backgroundTiles.render, args));
                game.addLayer(new Layer(3, game.sprites.render, args));
                game.addLayer(new Layer(1, game.walls.render, [image, game.renderer.texture, tint]));

                console.log(game);
                console.log(spriteSheets)

                game.timer.start()
            });

        game.timer.update = (deltaTime) => {
                game.renderer.render(game_canvas, game_context);
                collider.update(game.allEntities);
                messageCenter.update();
        }
}
MAIN();
