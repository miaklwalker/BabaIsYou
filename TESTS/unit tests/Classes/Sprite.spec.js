import {describe,expect,test,jest} from "@jest/globals";
import Sprite from "../../../src/classes/Sprite.js";
import createContextMock from "../../__mocks__/context.mock.js";

describe('Sprite',()=>{
    let spriteCoords = {
        x:0,
        y:0,
        w:24,
        h:24,
        name:'sprite',
    };
    let tint = 5;
    let sprite;
    test('Sprite should maintain the properties passed to it',()=>{
        sprite = new Sprite(spriteCoords,tint);
        expect(sprite.x).toBe(0);
        expect(sprite.y).toBe(0);
        expect(sprite.w).toBe(24);
        expect(sprite.h).toBe(24);
        expect(sprite.tint).toBe(5);
    });
    test('Expect render to draw to a context',()=>{
        let tintFn = jest.fn();
        let canvas = document.createElement('canvas');
        let context = createContextMock();
        let testImage = document.createElement('canvas')
        sprite.render(canvas,context,tintFn,1,1,testImage);
        expect(context.drawImage).toHaveBeenCalled();
        expect(tintFn).toHaveBeenCalledWith(
            expect.any(HTMLCanvasElement),
            expect.anything(),
            [0,0,24,24],
            testImage,
            tint
        )
    });
});