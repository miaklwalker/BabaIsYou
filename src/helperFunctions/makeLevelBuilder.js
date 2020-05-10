import blockFactory from "../helperFunctions/blockFactory.js";
import Wall from "../classes/Blocks/Wall.js";

export default function makeLevelBuilder(game){
    return (spriteSpec,levelSpec)=>{
        game.renderer.changePalette(spriteSpec.palettes[levelSpec.palettes]);
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
}