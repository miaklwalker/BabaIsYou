import {describe,expect,test} from "@jest/globals";
import buildTexturePack from "../../../src/helperFunctions/buildTexturePack.js";
import makeWallSprites from "../../../src/helperFunctions/makeWallSprites.js";

describe('MakeWallSprites',()=>{
    let baseTexturePack = buildTexturePack(384,1512,12,12);
    let tint = 25;
    test('Make Wall Sprites Should consume a texture pack',()=>{
        let wallSprites = makeWallSprites(baseTexturePack,tint);
        expect(wallSprites.size).toBe(16);
    })
});