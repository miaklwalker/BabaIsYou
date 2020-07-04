import chooseStrategy, {sprites, tiles, walls} from "../../../src/helperFunctions/ChooseStrategy.js";
import {describe, expect} from "@jest/globals";

describe('Choose Strategy Returns a rendering strategy config string',()=>{
    test.each(sprites)('chooseStrategy(%p) should return SPRITE',input=>{
        expect(chooseStrategy(input)).toBe('sprites');
    });
    test.each(tiles)('chooseStrategy(%p) should return TILE',input=>{
        expect(chooseStrategy(input)).toBe('tiles');
    });
    test.each(walls)('chooseStrategy(%p) should return WALL',input=>{
        expect(chooseStrategy(input)).toBe('wall');
    });
});