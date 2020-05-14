import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import makeLevelBuilder from "./helperFunctions/makeLevelBuilder.js";
import You from "./classes/Traits/You.js";
import RuleParser from "./classes/RuleParser.js";
import traitFactory from "./helperFunctions/traitFactory.js";
import enforceRules from "./helperFunctions/EnforceRules.js";
import Collider from "./classes/Collider.js";


const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');
const ruleParser =  new RuleParser();
const collider = new Collider();






export default function MAIN () {
        let game = new Game();
        let levelBuilder = makeLevelBuilder(game);

        game.setup()
            .then(({image, spriteSpec, levelSpec}) => {
                const {tint} = game.renderer;

                let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
                let args = [image, spriteSheets, tint];
                levelBuilder(spriteSpec, levelSpec);

                ruleParser.addWords(game.words.entities);
                ruleParser.parseRules();
                enforceRules(ruleParser.rules,game.entities);

                game.addLayer(new Layer(1, drawBackground, ['black']));
                game.addLayer(new Layer(0, drawGrid, [[19, 19]]));
                game.addLayer(new Layer(1, game.words.render, args));
                game.addLayer(new Layer(2, game.tiles.render, args));
                game.addLayer(new Layer(1, game.backgroundTiles.render, args));
                game.addLayer(new Layer(3, game.sprites.render, args));
                game.addLayer(new Layer(1, game.walls.render, [image, game.renderer.texture, tint]));


                game.timer.start()
            });

        game.timer.update = (deltaTime) => {
                game.renderer.render(game_canvas, game_context);
                collider.update(game.allEntities);
                game.messageCenter.update();
        }
}
MAIN();
