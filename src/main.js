import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import testWords from "./testFunctions/testWordBlocks.js";
import runTest from "./testFunctions/testRunner.js";
import gridMaker from "./TileMapper/src/components/Functions/makeGrid.js";
import {tilemapperInit} from "./TileMapper/src/components/Functions/tileMapperInit.js";

function getTile(x,y){
        return [x*32,y*66];
}


const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');
let game = new Game();
let tileMapper = tilemapperInit(game_canvas,game_context,[15,15]);


game.setup()
    .then(({image,spriteSpec})=>{
        let spriteSheets = parseJsonToSpriteSheet(spriteSpec.spriteSheets);
        //testWords(spriteSheets,game);
        game.renderer.changePalette(spriteSpec.palettes.base);
        game.addLayer(new Layer(1, drawBackground,['black']));
        //32 66
        game.addLayer(new Layer(1, gridMaker,[15,15]));
        //game.addLayer(new Layer(2,game.entities.render,[image,spriteSheets,game.renderer.tint]));
       // game.addLayer(new Layer(0,(canvas,context)=>{context.drawImage(image,0,0,canvas.width,canvas.height)}));
        game.addLayer(new Layer(1,(canvas,context)=>{
                context.drawImage(image,...getTile(0,1),25,25,0,0,25,26)
        }));

        game.timer.start()
    });
game.timer.update = (deltaTime) =>{
game.renderer.render(game_canvas,game_context);
};
/*
{
"single":[389,1517,15,15];
"left":[413,1515,20,20];
"down":[434,1512,20,20];

}

 */