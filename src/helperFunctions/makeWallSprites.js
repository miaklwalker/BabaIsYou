import Sprite from "../classes/Sprite.js";

export default function makeWallSprites(texturePack,tint){
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
            temp.push(new Sprite(sprite,tint));
            i++
        }
        buffer.set(texture,temp);
    }
    return buffer
}