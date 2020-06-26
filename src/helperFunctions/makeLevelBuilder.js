import blockFactory from "../helperFunctions/blockFactory.js";
import Push from "../classes/Traits/Push.js";
import buildTexturePack from "./buildTexturePack.js";




export default function makeLevelBuilder(game,masterList){
    return (spriteSpec,levelSpec)=>{
        game.gridDiminsions = levelSpec.divisions;

        let textureMap = {};

        let colors = {};

            Object.keys(levelSpec.wall)
                .forEach(type=>colors[type] = levelSpec.wall[type].tint);
            Object.keys(spriteSpec['textures'])
                .forEach(texture=> textureMap[texture] = buildTexturePack(...spriteSpec.textures[texture]))

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

    }
}

function makeWalls(wall,masterList,game){
    Object.keys(wall).forEach(type=>{
        wall[type].blocks.forEach((sprite)=>{
            let wall = blockFactory('wall',Object.values(sprite));
            wall.texture = type;
            game.addWall(wall);
            masterList.addEntiity(wall.id,wall);
        });
    })
}
function makeFloor(floors,masterList,game){
    floors.forEach(sprite=>{
        let floor = blockFactory('tiles', Object.values(sprite));
        game.addBackgroundTile(floor);
        masterList.addEntiity(floor.id,floor);
    });
}
function makeTiles(tiles,masterList,game){
    Object.keys(tiles).forEach(type=>{
        tiles[type].forEach(sprite=>{
            let tile = blockFactory('tiles', Object.values(sprite));
            game.addTile(tile);
            masterList.addEntiity(tile.id,tile);
            masterList.changeEntity(tile.id,"ROCK");
        })
    });
}
function makeWords(words,masterList,game){
    Object.keys(words).forEach(type=>{
        words[type].forEach(sprite => {
            let block = blockFactory(type, Object.values(sprite));
            block.addTrait(new Push());
            game.addWords(block);
            masterList.addEntiity(block.id,block);
            masterList.getEntity(block.id).isWord = true;
        })
    });
}
function makeSprites(sprites,masterList,game){
    Object.keys(sprites).forEach(type=>{
        sprites[type].forEach(sprite => {
            let block = blockFactory('sprites', Object.values(sprite));
            game.addSprite(block);
            masterList.addEntiity(block.id,block);
        })
    });
    console.log(masterList);
}