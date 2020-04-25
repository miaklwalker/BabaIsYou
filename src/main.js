import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import testWords from "./testFunctions/testWordBlocks.js";
import runTest from "./testFunctions/testRunner.js";


const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let game = new Game();

game.setup()
    .then(({image,spriteSpec})=>{
        let spriteSheets = parseJsonToSpriteSheet(spriteSpec.spriteSheets);
        testWords(spriteSheets,game);

        game.renderer.changePalette(spriteSpec.palettes.base);
        game.addLayer(new Layer(1, drawBackground,['black']));
        game.addLayer(new Layer(1, drawGrid,[15]));
        game.addLayer(new Layer(2,game.entities.render,[image,spriteSheets,game.renderer.tint]));


        game.timer.start()
    });
game.timer.update = (deltaTime) =>{
game.renderer.render(game_canvas,game_context);
};
