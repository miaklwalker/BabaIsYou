import blockFactory from "../helperFunctions/blockFactory.js";
import Wall from "../classes/Blocks/Wall.js";
import You from "../classes/Traits/You.js";
import Push from "../classes/Traits/Push.js";

export default function makeLevelBuilder(game){
    return (spriteSpec,levelSpec)=>{
        game.gridDiminsions = levelSpec.divisions;
        game.renderer.changePalette(spriteSpec.palettes[levelSpec.palettes]);
        game.renderer.changeTexture(spriteSpec.textures[levelSpec.textures]);

        const {words,tiles,wall,floor,sprites} = levelSpec;

        Object.keys(sprites).forEach(type=>{
            sprites[type].forEach(sprite => {
                let block = blockFactory('sprites', Object.values(sprite));
                block.addTrait(new Push());
                game.messageCenter.subscribe(block);
                game.addSprite(block)
            })
        });
        //words
        Object.keys(words).forEach(type=>{
            words[type].forEach(sprite => {
                let block = blockFactory(type, sprite);
                block.addTrait(new Push());
                game.messageCenter.subscribe(block);
                game.addWords(block)
            })
        });
        // tiles
        Object.keys(tiles).forEach(type=>{
            tiles[type].forEach(sprite=>{
                let tile = blockFactory('tiles', Object.values(sprite));
                game.messageCenter.subscribe(tile);
                game.addTile(tile);
            })
        });
        //floors
        floor.forEach(sprite=>{
            let floor = blockFactory('tiles', Object.values(sprite));
            game.messageCenter.subscribe(floor);
            game.addBackgroundTile(floor)
        });
        // walls
        wall.forEach(({x,y})=>{
            let wall = new Wall(x,y);
            game.messageCenter.subscribe(wall);
            game.addWall(wall);
        });
    }
}