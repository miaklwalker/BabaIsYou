import buildTexturePack from "../helperFunctions/buildTexturePack.js";
import xyCounter from "../helperFunctions/xyCounter.js";

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