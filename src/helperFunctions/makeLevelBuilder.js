import blockFactory from "../helperFunctions/blockFactory.js";
import Wall from "../classes/Blocks/Wall.js";
import Sprite from "../classes/Sprite.js";
import You from "../classes/Traits/You.js";

export default function makeLevelBuilder(game){
    return (spriteSpec,levelSpec)=>{
        game.renderer.changePalette(spriteSpec.palettes[levelSpec.palettes]);
        game.renderer.changeTexture(spriteSpec.textures[levelSpec.textures]);
        const {words,tiles,wall,floor,sprites} = levelSpec;
        console.log(levelSpec);
        console.log(spriteSpec);
        let baba = blockFactory('sprites',Object.values(sprites.BABA[0]));
        baba.addTrait(new You());
        game.addSprite(baba);
        game.messageCenter.subscribe(baba);

        //words
        Object.keys(words).forEach(type=>{
            words[type].forEach(sprite => game.addEntity(blockFactory(type, sprite)))
        });
        // tiles
        Object.keys(tiles).forEach(type=>{
            tiles[type].forEach(sprite=>{
                game.addEntity(blockFactory('tiles', Object.values(sprite)))
            })
        });
        //floors
        floor.forEach(sprite=>{
            game.addTile(blockFactory('tiles', Object.values(sprite)))
        });
        // walls
        wall.forEach(({x,y})=>{
            game.addWall(new Wall(x,y));
        });
    }
}