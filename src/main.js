import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import NounBlock from './classes/Blocks/NounBlock.js'
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";


const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

function n(num){
    return num * (game_canvas.width / 15);
}

function makeTest(testObj){
    let result = [];
    let keys = Object.keys(testObj);
    for(let i = 0 ; i < 1 ; i++){
        for(let j = 0 ; j < 15 ; j++){
            result.push([n(i),n(j),keys[j+(i*15)]])
        }
    }
    return result;
}



let game = new Game();
game.setup()
    .then(({image,spriteSpec})=>{
        let spriteSheets = parseJsonToSpriteSheet(spriteSpec.spriteSheets);
        let testEntities = makeTest(spriteSheets.noun);
        console.log(testEntities,spriteSheets);
        testEntities.forEach(entity=>{
            game.addEntity(new NounBlock(...entity));
        });
        game.renderer.changePalette(spriteSpec.palettes.base);

        game.addLayer(new Layer(1, drawBackground,['black']));
        game.addLayer(new Layer(1, drawGrid,[15]));
        game.addLayer(new Layer(2,game.entities.render,[image,spriteSheets,game.renderer.tint]));


        game.timer.start()
    });
game.timer.update = (deltaTime) =>{
game.renderer.render(game_canvas,game_context);
};
