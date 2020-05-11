import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import makeLevelBuilder from "./helperFunctions/makeLevelBuilder.js";


const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

let game = new Game();


game.setup()
    .then(({image,spriteSpec,levelSpec})=>{

        let spriteSheets = parseJsonToSpriteSheet(spriteSpec);
        
        const {render} = game.entities;
        const {tint} = game.renderer;

        makeLevelBuilder(game)(spriteSpec,levelSpec);

        game.addLayer(new Layer(1, drawBackground,['black']));
        game.addLayer(new Layer(0, drawGrid,[[20,20]]));
        game.addLayer(new Layer(2, game.entities.render,[image, spriteSheets,tint]));
        game.addLayer(new Layer(1, game.tiles.render,   [image, spriteSheets,tint]));
        game.addLayer(new Layer(2, game.walls.render,   [image, game.renderer.texture,tint]));
        game.addLayer(new Layer(3, game.sprites.render, [image, spriteSheets,tint]));
        game.addLayer(new Layer(1, render,[image,spriteSheets,tint]));


        game.timer.start()
    });

game.timer.update = (deltaTime) =>{
game.renderer.render(game_canvas,game_context);
game.messageCenter.update();
};
