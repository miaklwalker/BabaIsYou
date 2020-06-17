import blockFactory from "../helperFunctions/blockFactory.js";
import Push from "../classes/Traits/Push.js";
import buildTexturePack from "./buildTexturePack.js";

export default function makeLevelBuilder(game,messageCenter){
    return (spriteSpec,levelSpec)=>{
        game.gridDiminsions = levelSpec.divisions;
        let textureMap = {};
        let colors = {};
            Object.keys(levelSpec.wall).forEach(type=>colors[type] = levelSpec.wall[type].tint);
            Object.keys(spriteSpec.textures).forEach(texture=> textureMap[texture] = buildTexturePack(...spriteSpec.textures[texture]))

        game.renderer.changePalette(spriteSpec["palettes"][levelSpec["palettes"]]);
        game.renderer.addTexture(textureMap);
        game.renderer.colorMap = colors;

        const {words,tiles,wall,floor,sprites} = levelSpec;
        //sprites
        Object.keys(sprites).forEach(type=>{
            sprites[type].forEach(sprite => {
                let block = blockFactory('sprites', Object.values(sprite));
                messageCenter.subscribe(block);
                game.addSprite(block)
            })
        });
        //words
        Object.keys(words).forEach(type=>{
            words[type].forEach(sprite => {
                let block = blockFactory(type, Object.values(sprite));
                block.addTrait(new Push());
                messageCenter.subscribe(block);
                game.addWords(block)
            })
        });
        // tiles
        Object.keys(tiles).forEach(type=>{
            tiles[type].forEach(sprite=>{
                let tile = blockFactory('tiles', Object.values(sprite));
                messageCenter.subscribe(tile);
                game.addTile(tile);
            })
        });
        //floors
        floor.forEach(sprite=>{
            let floor = blockFactory('tiles', Object.values(sprite));
            messageCenter.subscribe(floor);
            game.addBackgroundTile(floor)
        });
        // walls
        Object.keys(wall).forEach(type=>{
           wall[type].blocks.forEach((sprite)=>{
                let wall = blockFactory('wall',Object.values(sprite));
                wall.texture = type;
                messageCenter.subscribe(wall);
                game.addWall(wall);
            });
        })

    }
}