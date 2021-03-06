import blockFactory from "../helperFunctions/blockFactory.js";
import Push from "../classes/Traits/Push.js";
import buildTexturePack from "./buildTexturePack.js";
import createBorder from "./createBorder.js";
import Sprite from "../classes/Sprite.js";



export default function makeLevelBuilder(game,masterList){
    return (spriteSpec,levelSpec)=>{
        game.gridDiminsions = levelSpec.divisions;

        let textureMap = {};

        let colors = {};

        let wallColors = Object.keys(levelSpec.wall);
            wallColors.forEach(type=>colors[type] = levelSpec.wall[type].tint);
            wallColors.forEach(texture=> textureMap[texture] = buildTexturePack(...spriteSpec['textures'][texture]));

        game.renderer.changePalette(spriteSpec["palettes"][levelSpec["palettes"]]);
        game.renderer.addTexture(textureMap);
        game.renderer.colorMap = colors;

        const {words,tiles,wall,floor,sprites} = levelSpec;
        //sprites
        makeSprites(sprites,masterList,game);
        //words
        makeWords(words,masterList,game);
        // tiles
        makeTiles(tiles,masterList,game);
        //floors
        makeFloor(floor,masterList,game);
        // walls
        makeWalls(wall,masterList,game);
        // creates the walls around the edge;
        buildBorder(createBorder(game.gridDiminsions),masterList,game);

    }
}
function buildBorder (border,masterList,game) {
    border.forEach(sprite=>{
        let edge = blockFactory("tiles",Object.values(sprite));
        edge.isRendered = false;
        edge.strictCollide = true;
        edge.resetFlags = ()=>{};
        masterList.addEntity(edge.id,edge);
    })
}

function makeWalls(wall,masterList,game){
    Object.keys(wall).forEach(type=>{
        wall[type].blocks.forEach((sprite)=>{
            let wall = blockFactory('wall',Object.values(sprite));
            wall.texture = type;
            masterList.addEntity(wall.id,wall);
            game.addForeground(wall.id);
        });
    })
}
function makeFloor(floors,masterList,game){
    floors.forEach(sprite=>{
        let floor = blockFactory('tiles', Object.values(sprite));
        masterList.addEntity(floor.id,floor);
        game.addBackground(floor.id);
    });
}
function makeTiles(tiles,masterList,game){
    Object.keys(tiles).forEach(type=>{
        tiles[type].forEach(sprite=>{
            let tile = blockFactory('tiles', Object.values(sprite));
            masterList.addEntity(tile.id,tile);
            game.addForeground(tile.id);
        })
    });
}
function makeWords(words,masterList,game){
    Object.keys(words).forEach(type=>{
        words[type].forEach(sprite => {
            let block = blockFactory(type, Object.values(sprite));
            block.addTrait(new Push());
            masterList.addEntity(block.id,block);
            masterList.changeEntityFlag(block.id,"isWord",true);
            masterList.changeEntityFlag(block.id,"useRules",false);
            game.addForeground(block.id);
        })
    });
}
function makeSprites(sprites,masterList,game){
    Object.keys(sprites).forEach(type=>{
        sprites[type].forEach(sprite => {
            let block = blockFactory('sprites', Object.values(sprite));
            masterList.addEntity(block.id,block);
            game.addTopLevel(block.id);
        })
    });
}