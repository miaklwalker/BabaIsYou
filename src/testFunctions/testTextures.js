import buildTexturePack from "../helperFunctions/buildTexturePack.js";
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


let counter = xyCounter(15);
export default function testTextures(spriteSpec,game,image) {
    let textures = Object.values(spriteSpec.textures);
    for (let [sx, sy] of textures) {
        let pack = buildTexturePack(Number(sx), Number(sy));
        for (let tile in pack) {
            let [x1, y1] = counter();
            const {x, y} = pack[tile][0];
            game.renderer.renderImage(image, x1, y1, x, y);
        }
    }
}