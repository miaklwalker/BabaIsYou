import {describe,expect,test,jest} from "@jest/globals";
import EntityList from "../../../src/classes/EntityList.js";
import Sprite from "../../../src/classes/Sprite.js";
import SpriteBlock from "../../../src/classes/Blocks/spriteBlock.js";
import createContextMock from "../../__mocks__/context.mock.js";

describe('EntityList',()=>{
    let game = {
        gridDiminsions:[20,20],
    };
    let entityList = new EntityList(game);
    test('Divisions should return the current levels layout',()=>{
        expect(entityList.divisions).toEqual([20,20]);
    });
});