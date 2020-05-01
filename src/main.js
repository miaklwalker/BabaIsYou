import drawBackground from "./drawFunctions/drawBackground.js";
import drawGrid from "./drawFunctions/drawGrid.js";
import Layer from "./classes/Layer.js";
import Game from "./classes/Game.js";
import parseJsonToSpriteSheet from "./helperFunctions/parseJsonToSpritesheet.js";
import NounBlock from "./classes/Blocks/NounBlock.js";
import PropertyBlock from "./classes/Blocks/PropertyBlock.js";
import OperatorBlock from "./classes/Blocks/OperatorBlock.js";
import testWords from "./testFunctions/testWordBlocks.js";
import testTextures from "./testFunctions/testTextures.js";
import Tile from "./classes/Blocks/Tile.js";
import Wall from "./classes/Blocks/Wall.js";

const game_canvas = document.getElementById('screen');
const game_context = game_canvas.getContext('2d');

// game_canvas.width=768;
// game_canvas.height =1584;

let game = new Game();

function xyCounter(breakPoint){
    let x = 0;
    let y = 0;
    return ()=>{
        x++;
        if(x%breakPoint === 0
            && x !== 0){
            y++;
            x=0
        }
        return [x,y]
    }
}



function blockFactory(type,sprite){
    let types = {
        nouns:(sprite) =>new NounBlock(...sprite),
        operators:(sprite) => new OperatorBlock(...sprite),
        properties:(sprite) => new PropertyBlock(...sprite),
        tiles:(sprite) => new Tile(...sprite)
};
    return types[type](sprite);
}



function buildLevel(spriteSpec,levelSpec){
    game.renderer.changePalette(spriteSpec.palettes[levelSpec.palettes]);
    console.log(spriteSpec.textures[levelSpec.textures]);
    game.renderer.changeTexture(spriteSpec.textures[levelSpec.textures]);
    const {words,tiles,wall} = levelSpec;
    let groups = {words,tiles};
    for(let group in groups){
        for(let type in groups[group]){
            if(group !== 'tiles') {
                groups[group][type].forEach(sprite => game.addEntity(blockFactory(type, sprite)))
            }else{
                groups[group][type].forEach(sprite => {
                    if(type ==='floor') {
                        game.tiles.addEntity(blockFactory(group, Object.values(sprite)))
                    }else{
                        game.addEntity(blockFactory(group, Object.values(sprite)))
                    }
                })
            }
        }
    }
    wall.forEach(({x,y})=>{
        game.walls.addEntity(new Wall(x,y));
    })
}



game.setup()
    .then(({image,spriteSpec,levelSpec})=>{
        let spriteSheets = parseJsonToSpriteSheet(spriteSpec);

        const {render} = game.entities;
        const {tint} = game.renderer;

        buildLevel(spriteSpec,levelSpec);

        game.addLayer(new Layer(0, drawGrid,[[32,66]]));
        game.addLayer(new Layer(0,(canvas,context)=>{context.drawImage(image,0,0,canvas.width,canvas.height)}));
        game.addLayer(new Layer(1, drawBackground,['black']));
        game.addLayer(new Layer(0, drawGrid,[[20,20]]));
        game.addLayer(new Layer(1, game.tiles.render,[image,spriteSheets,tint]));
        game.addLayer(new Layer(1, render,[image,spriteSheets,tint]));
        game.addLayer(new Layer(1,game.walls.render,[image,game.renderer.texture,tint]));


        //testWords(spriteSheets,game);
       //testTextures(spriteSpec,game,image);


        game.timer.start()
    });

game.timer.update = (deltaTime) =>{
game.renderer.render(game_canvas,game_context);
};
