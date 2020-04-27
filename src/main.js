import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import testWords from "./testFunctions/testWordBlocks.js";
import testTextures from "./testFunctions/testTextures.js";


function getTile(x,y){
        return [x * (768 / 32),y *  (1584 / 66)];
}


const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let game = new Game();

// temp code remove later
// game_canvas.width=768;
// game_canvas.height =1584;
// sprite size IS 24 x 24




game.setup()
    .then(({image,spriteSpec})=>{
        let spriteSheets = parseJsonToSpriteSheet(spriteSpec.spriteSheets);

        game.renderer.changePalette(spriteSpec.palettes.base);

        game.addLayer(new Layer(1, drawBackground,['black']));
        game.addLayer(new Layer(0, drawGrid,[[32,66]]));
        game.addLayer(new Layer(1, drawGrid,[[15,15]]));
        game.addLayer(new Layer(1,game.entities.render,[image,spriteSheets,game.renderer.tint]));
        game.addLayer(new Layer(0,(canvas,context)=>{context.drawImage(image,0,0,canvas.width,canvas.height)}));


        //testTextures(spriteSpec,game,image);
        testWords(spriteSheets,game);




        game.timer.start()
    });

game.timer.update = (deltaTime) =>{
game.renderer.render(game_canvas,game_context);
};
