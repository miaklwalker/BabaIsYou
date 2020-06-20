import {describe, expect, test} from "@jest/globals";
import SpriteBlock from "../../../src/classes/Blocks/spriteBlock.js";
import makeOrthagonalMap from "../../../src/helperFunctions/makeOrthagonalMap.js";

describe('make orthagonal map',()=>{
    describe('Should return a object containing "Left" , "Down" , "Right" , "UP" ',()=>{
        test('Returns a object with the correct properties',()=>{
            let block = new SpriteBlock(1,1,'baba');
            let map = makeOrthagonalMap(block);
            let {right,left,up,down} = map;
            expect(right).toEqual({x:2,y:1});
            expect(left).toEqual({x:0,y:1});
            expect(up).toEqual({x:1,y:0});
            expect(down).toEqual({x:1,y:2});
        })
    })
});