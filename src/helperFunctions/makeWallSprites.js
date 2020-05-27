import Sprite from "../classes/Sprite.js";

export default function makeWallSprites(texturePack){
    let buffer = new Map();
    for(let texture in texturePack){
        let temp = [];
        let i = 0 ;
        for(let set of texturePack[texture]){
            let sprite = {
                x:set.x,
                y:set.y,
                w:set.width,
                h:set.height,
                name:i
            };
            temp.push(new Sprite(sprite,7));
            i++
        }
        buffer.set(texture,temp);
    }
    return buffer
}